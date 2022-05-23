//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./libraries/Math.sol";
import "./RollswapERC20.sol";

contract RollswapPair is ReentrancyGuard {
    using SafeMath for uint256;
    using Math for uint256;
    using SafeERC20 for IERC20Metadata;

    IERC20Metadata public token0;
    IERC20Metadata public token1;
    RollswapERC20 public lpToken;

    event Mint(address sender, uint256 token0amount, uint256 token1amount);
    event Burn(address sender, uint256 lpTokenAmount);
    event Swap(
        address indexed sender,
        uint256 amount0in,
        uint256 amount1in,
        uint256 amount0out,
        uint256 amount1out,
        address indexed to
    );

    constructor(IERC20Metadata _token0, IERC20Metadata _token1) ReentrancyGuard() {

        token0 = IERC20Metadata(_token0);
        token1 = IERC20Metadata(_token1);
        lpToken = _createLPToken();
    }

    function _createLPToken() private returns (RollswapERC20) {
        string memory name = string(abi.encodePacked("Rollswap", token0.name(),"/", token1.name(), " LP Token"));
        string memory symbol = string(abi.encodePacked("Roll", token0.symbol(), "/", token1.symbol()));

        return new RollswapERC20(name, symbol, address(token0), address(token1));
    }

    function getReserve() public view returns (uint256, uint256) {
        return (IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)));
    }
 
    function addLiquidity(uint256 _token0amount, uint256 _token1amount) external nonReentrant {
        _transferTokensToPool(msg.sender, _token0amount, _token1amount );
        uint256 lpTokenAmount = _calculateLPTokenToMint(_token0amount,_token1amount);
        lpToken.mint(msg.sender, lpTokenAmount);

        emit Mint(msg.sender, _token0amount, _token1amount);
    }

    function _transferTokensToPool(address _provider, uint256 _token0amount, uint256 _token1amount) private {
        require(_token0amount>0 && _token1amount>0, "Token amount must be greater than 0");
        require(token0.allowance(_provider, address(this)) >= _token0amount && token1.allowance(_provider, address(this)) >= _token1amount, "allowance must be greater than amount");

        token0.safeTransferFrom(_provider,address(this), _token0amount);
        token1.safeTransferFrom(_provider, address(this), _token1amount);
    }

    function _calculateLPTokenToMint(uint256 _token0amount, uint256 _token1amount) private view returns (uint256) {
        uint256 lpTokenSupply = lpToken.totalSupply();
        if (lpTokenSupply == 0) {
            return (_token0amount * _token1amount).sqrt();
        } else {
            uint256 reserve0 = token0.balanceOf(address(this));
            uint256 reserve1 = token1.balanceOf(address(this));

            uint256 totalValueInPoolAsToken0 = reserve0.mul(2);
            uint256 token1AmountAddedAsToken0 = _token1amount.mul(reserve0).div(reserve1);
            uint256 totalValueAddedAsToken0 = _token0amount.add(token1AmountAddedAsToken0);

            uint256 totalFutureSupply = lpTokenSupply.mul(totalValueInPoolAsToken0).div((
                totalValueInPoolAsToken0.sub(totalValueAddedAsToken0)
            ));
            
            uint256 total = totalFutureSupply - lpTokenSupply;
            return total;
        }
    }

    function removeLiquidity(uint256 _lpTokenAmount) external nonReentrant {
        (uint256 token0amount, uint256 token1amount) = _getPoolOwnership(_lpTokenAmount);
        lpToken.burn(msg.sender, _lpTokenAmount);
        
        _transferTokenstoSender(msg.sender, token0amount, token1amount);

        emit Burn(msg.sender, _lpTokenAmount);
    }

    function _getPoolOwnership(uint256 _lpTokenAmount) private view returns (uint256 token0amount, uint256 token1amount)  {
        uint256 lpTokenSupply = lpToken.totalSupply();
        uint256 reserve0 = token0.balanceOf(address(this));
        uint256 reserve1 = token1.balanceOf(address(this));

        return (
            ((reserve0.mul(_lpTokenAmount).div(lpTokenSupply))),
            ((reserve1.mul(_lpTokenAmount).div(lpTokenSupply)))
        );

    }

    function _transferTokenstoSender(address _provider, uint256 _token0amount, uint256 _token1amount) private {
        token0.safeTransfer(_provider, _token0amount);
        token1.safeTransfer(_provider, _token1amount);
    }

    function swapToken0forToken1(uint256 _amountIn) external nonReentrant {
        require(_amountIn>0, 'amountSwap must be greater than 0');
        (uint256 reserve0, uint256 reserve1) = getReserve();
        token0.safeTransferFrom(msg.sender, address(this), _amountIn);

        uint256 amountSwap = _getAmount(_amountIn, reserve0, reserve1);
        require(amountSwap < reserve1, "amountSwap must be smaller than reserve");

        token1.safeTransfer(msg.sender, amountSwap);
    }

    function _getAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) private pure returns (uint256) {
        require(inputReserve > 0 && outputReserve >0, "reserve must be larger than 0");

        uint256 inputAmountWithFee = inputAmount ;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = inputReserve + inputAmountWithFee;

        return numerator / denominator;
    }

    function getLPtokenAmount() external view returns (uint256) {
        return lpToken.balanceOf(msg.sender);
    }
    
}