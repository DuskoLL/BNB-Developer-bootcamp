// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Sahara.sol";

/**
 * @dev This is an auxiliary contract meant to be assigned as the admin of a {TransparentUpgradeableProxy}. For an
 * explanation of why you would want to use this see the documentation for {TransparentUpgradeableProxy}.
 */
contract SaharaV2 is Sahara {
    
    //增加一个可以自增的函数
    function increment() public {
        setValue(retrieve()+1);
    }

    //增加一个自减的函数
    function reduce() public {
        setValue(retrieve()-1);
    }
}