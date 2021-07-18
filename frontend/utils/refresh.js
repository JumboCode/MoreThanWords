import React from "react";
/* Higher order function that returns the component binded with refresh_func */
export function componentWithRefreshFunc(Component, refresh_func) {
  return function ({...rest}) {
      return <Component refresh={refresh_func} {...rest}/>
  }
}
