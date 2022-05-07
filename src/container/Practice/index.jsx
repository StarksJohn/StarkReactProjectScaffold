import React, { useEffect, useRef, useState, useMemo, useCallback, memo ,Suspense} from 'react'
import s from './style.module.less'
import { useHistory } from 'react-router-dom'
import { Loading,ActivityIndicator } from 'zarm';
const OtherComponent = React.lazy(() => Promise.resolve(import('./OtherComponent')));

const Child = React.memo((props) => {
  const { style } = props;

  console.log('触发Child组件渲染');
  return (
    <h1 style={style}>测useMemo包裹的子组件的重绘</h1>
  )
});

const Practice = () => {
  const history = useHistory()
  const [showLazyComp, setShowLazyComp] = useState(false)
  const [num, setNum] = useState(0);
  const [color, setColor] = useState('green')

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

  const testDynamicImports = () => {
    import('starkfrontendtools').then(starkfrontendtools => {
      const randomNum = starkfrontendtools.Math.randomNums(0, 10)
      console.log('testDynamicImports randomNum=', randomNum)
    })
  }

  const testLazy = () => {
    setShowLazyComp(!showLazyComp)
  }

  const testMemo=() => {
    import('starkfrontendtools').then(starkfrontendtools => {
      const randomNum = starkfrontendtools.Math.randomNums(0, 1)
      // console.log('testMemo randomNum=', randomNum)
      if (randomNum===0) {
        setColor('green')
      } else {
        setColor('red')
      }
    })
  }


  //render
  return <div className={s._page}>
    {/*测试动态import https://zh-hans.reactjs.org/docs/code-splitting.html*/}
    <div className={s.cell} onClick={testDynamicImports}>测试动态import</div>
    {/*测试懒加载lazy https://zh-hans.reactjs.org/docs/code-splitting.html*/}
    <div className={s.cell} onClick={testLazy}>测试懒加载lazy</div>
    {showLazyComp&&<Suspense fallback={<ActivityIndicator size="lg" />}>
      <OtherComponent />
    </Suspense>}
    {/*测试memo和useMemo https://www.bianchengquan.com/article/145784.html*/}
    <div className={s.cell} onClick={testMemo}>测试memo num={num}</div>
    <Child style={useMemo(() => ({ color: color}), [color])}/>

  </div>
}

export default Practice


