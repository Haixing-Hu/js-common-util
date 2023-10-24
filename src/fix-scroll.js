////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isIos from './is-ios';

/**
 * 修复在iOS下的页面切换滚动定位问题。
 *
 * @author 胡海星
 */
function fixScroll() {
  if (isIos()) {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollTop + 1);
      if (document.body.scrollTop >= 1) {
        window.scrollTo(0, document.body.scrollTop - 1);
      }
    }, 50);
  }
}

export default fixScroll;
