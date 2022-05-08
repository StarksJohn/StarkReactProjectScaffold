import React, { useEffect, useRef, useState, useMemo, useCallback, memo, Suspense, createContext } from 'react'
import s from './style.module.less'
import { useHistory } from 'react-router-dom'
import { Loading, ActivityIndicator } from 'zarm'

const OtherComponent = React.lazy(() => Promise.resolve(import('./OtherComponent')))

/**
 * props里有对象类型的属性的子组件,其props里的对象属性,如style,在传入时要用useMemo包裹,才能避免子组件重绘
 * @type {React.NamedExoticComponent<object>}
 */
const Child = memo((props) => {
  const { style, onFnc ,obj} = props

  console.log('触发有props的子组件渲染 props=',props)
  return (
    <h1 style={style}>测useMemo包裹的子组件的重绘</h1>
  )
})

/**
 * 没有props的子组件不会因父组件重绘
 * @type {React.NamedExoticComponent<object>}
 */
const PureChild = memo(() => {
  console.log('触发没有props的子组件渲染')
  return (
    <h1>这是没有props的子组件</h1>
  )
})

const DemoContext = createContext();
const ContextChild = () => {
  console.log('触发ContextChild组件渲染');
  return (
    <h1>这是ContextChild组件的渲染内容！</h1>
  )
};

function DemoComponent(props) {
  const { children } = props;
  const [num, setNum] = useState(0);
  return (
    <DemoContext.Provider value={num}>
      <button className={s.cell} onClick={() => setNum(num + 1)}>num加1</button>
      {children}
    </DemoContext.Provider>
  );
}
const green={ color: 'green'}//此对象的引用不会变
const red={ color: 'red'}//此对象的引用不会变

const Practice = () => {
  const history = useHistory()
  const [showLazyComp, setShowLazyComp] = useState(false)
  const [num, setNum] = useState(0)
  // const [color, setColor] = useState('green')
  const [style, setStyle] = useState(green)
  const [normalValue, setNormalValue] = useState({
    a: 'b',
  });

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

  const testMemo = () => {
    import('starkfrontendtools').then(starkfrontendtools => {
      const randomNum = starkfrontendtools.Math.randomNums(0, 1)
      // console.log('testMemo randomNum=', randomNum)
      if (randomNum === 0) {
        // setColor('green')
        // setNormalValue({//改变了 normalValue 对象的引用,会导致子组件重绘
        //   color: 'green',
        // })
        setStyle(green)
      } else {
        // setColor('red')
        // setNormalValue({//改变了 normalValue 对象的引用,会导致子组件重绘
        //   color: 'red',
        // })
        setStyle(red)

      }
      setNum(num+1)
    })
  }

  const oneFnc = useCallback(() => {
    console.log('这是传入child子组件的方法')
  }, [])

  //render
  return <div className={s._page}>
    {/*测试动态import https://zh-hans.reactjs.org/docs/code-splitting.html*/}
    <div className={s.cell} onClick={testDynamicImports}>测试动态import</div>
    {/*测试懒加载lazy https://zh-hans.reactjs.org/docs/code-splitting.html*/}
    <div className={s.cell} onClick={testLazy}>测试懒加载lazy</div>
    {showLazyComp && <Suspense fallback={<ActivityIndicator size="lg" />}>
      <OtherComponent />
    </Suspense>}
    {/*测试 memo | useMemo | useCallback https://www.bianchengquan.com/article/145784.html*/}
    <PureChild></PureChild>
    <div className={s.cell} onClick={testMemo}>测试memo num={num}</div>
    <Child style={useMemo(() => (style), [style])} onFnc={oneFnc}/*传入组件的函数使用React.useCallback*/
    obj={normalValue}/**/
    />
    {/*使用children来避免React Context子组件的重复渲染,感觉文章代码有问题,看不懂 https://www.bianchengquan.com/article/145784.html*/}
    <DemoComponent>
      <ContextChild />
    </DemoComponent>
    );
  </div>
}

export default Practice


