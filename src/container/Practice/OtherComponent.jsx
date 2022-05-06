import React, { useEffect, useRef, useState, useMemo, useCallback, memo, forwardRef, useImperativeHandle, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import s from '@/container/Practice/style.module.less'

OtherComponent.propTypes = {}
OtherComponent.defaultProps = {}

function OtherComponent (props, parentRef) {
  const {} = props
  const history = useHistory()

  /**
   * componentDidMount && componentWillUnmount
   */
  useEffect(
    /* The async keyword cannot be added to the first parameter https://juejin.im/post/6844903985338400782#heading-27 */
    () => {
      console.log('OtherComponent componentDidMount,props=', props)

      // componentWillUnmount
      return () => {
        console.log('OtherComponent componentWillUnmount')
      }
    }, [])


  // render
  return  <div className={s.cell}>OtherComponent</div>
}

export default memo(OtherComponent)
