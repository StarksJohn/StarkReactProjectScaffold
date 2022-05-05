import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react'
import s from './style.module.less'
import { useHistory } from 'react-router-dom'

const Practice = () => {
  const history = useHistory()

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log(`Practice componentDidMount`)


      //componentWillUnmount
      return () => {
        // console.log(`Practice componentWillUnmount`)
      }
    }, [])

  /**
   * 测试动态import https://zh-hans.reactjs.org/docs/code-splitting.html
   */
  const testDynamicImports = () => {
    import("starkfrontendtools").then(starkfrontendtools => {
     const randomNum= starkfrontendtools.Math.randomNums(0,10)
      console.log('testDynamicImports randomNum=',randomNum)
    });
  }

  //render
  return <div className={s._page}>
    <div className={s.cell} onClick={testDynamicImports}>测试动态import</div>
  </div>
}

export default Practice


