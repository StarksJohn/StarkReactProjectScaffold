import React, { useEffect, useRef, useState, useMemo, useCallback, memo ,Suspense} from 'react'
import s from './style.module.less'
import { useHistory } from 'react-router-dom'
import { Loading,ActivityIndicator } from 'zarm';
const OtherComponent = React.lazy(() => Promise.resolve(import('./OtherComponent')));


const Practice = () => {
  const history = useHistory()
  const [showLazyComp, setShowLazyComp] = useState(false)

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /*The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log(`Practice componentDidMount`)

      //componentWillUnmount
      return () => {
        console.log(`Practice componentWillUnmount`)
      }
    }, [])

  /**
   * 测试动态import https://zh-hans.reactjs.org/docs/code-splitting.html
   */
  const testDynamicImports = () => {
    import('starkfrontendtools').then(starkfrontendtools => {
      const randomNum = starkfrontendtools.Math.randomNums(0, 10)
      console.log('testDynamicImports randomNum=', randomNum)
    })
  }

  /**
   * https://zh-hans.reactjs.org/docs/code-splitting.html
   */
  const testLazy = () => {
    setShowLazyComp(!showLazyComp)
  }


  //render
  return <div className={s._page}>
    <div className={s.cell} onClick={testDynamicImports}>测试动态import</div>
    <div className={s.cell} onClick={testLazy}>测试懒加载lazy</div>
    {showLazyComp&&<Suspense fallback={<ActivityIndicator size="lg" />}>
      <OtherComponent />
    </Suspense>}
  </div>
}

export default Practice


