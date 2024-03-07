import require$$0, { memo, Children, useMemo, useRef, useCallback, useEffect, useState } from "react";
import mergeRefs from "react-merge-refs";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";
const getTurn = (selected) => {
  let turn = selected % 1;
  if (turn >= 0.5) {
    turn -= 1;
  }
  return turn;
};
const container$1 = "_container_1v3jh_1";
var classes$1 = {
  container: container$1
};
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  g !== void 0 && (e = "" + g);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const defaultShadowBackground = "rgb(0, 0, 0, 0.25)";
const getFlippingPagesShadow = (background = defaultShadowBackground) => {
  const _FlippingPagesShadow = (props) => {
    const {
      selected,
      willChange
    } = props;
    const turn = getTurn(selected);
    return /* @__PURE__ */ jsx("div", {
      className: classes$1.container,
      style: {
        background,
        opacity: Math.abs(turn) * 2,
        willChange: willChange ? "opacity" : void 0
      }
    });
  };
  return memo(_FlippingPagesShadow);
};
const getTransform = (direction, turn) => {
  switch (direction) {
    case "bottom-to-top":
      return `rotateX(${turn * 180}deg)`;
    case "top-to-bottom":
      return `rotateX(${turn * -180}deg)`;
    case "left-to-right":
      return `rotateY(${turn * 180}deg)`;
    case "right-to-left":
      return `rotateY(${turn * -180}deg)`;
  }
};
const container = "_container_1veud_1";
const fullPage = "_fullPage_1veud_7";
const prevPage = "_prevPage_1veud_8";
const nextPage = "_nextPage_1veud_9";
const shadow = "_shadow_1veud_97";
var classes = {
  container,
  fullPage,
  prevPage,
  nextPage,
  "bottom-to-top": "_bottom-to-top_1veud_13",
  "top-to-bottom": "_top-to-bottom_1veud_13",
  "left-to-right": "_left-to-right_1veud_17",
  "right-to-left": "_right-to-left_1veud_17",
  shadow
};
const _FlippingPagesCore = (props) => {
  const {
    containerProps,
    containerRef,
    direction,
    selected,
    shadowBackground
  } = props;
  const children = Children.toArray(props.children);
  const ShadowComponent = useMemo(() => props.shadowComponent ? props.shadowComponent : getFlippingPagesShadow(shadowBackground), [shadowBackground, props.shadowComponent]);
  const turn = getTurn(selected);
  const willChange = !!props.willChange;
  return /* @__PURE__ */ jsxs("div", {
    ...containerProps,
    ref: containerRef,
    className: classNames(classes.container, containerProps?.className),
    children: [/* @__PURE__ */ jsx("div", {
      className: classNames({
        [classes.fullPage]: turn === 0,
        [classes.prevPage]: turn > 0,
        [classes.nextPage]: turn < 0
      }, classes[direction]),
      children: /* @__PURE__ */ jsx("div", {
        children: children[Math.round(selected)]
      })
    }), turn !== 0 && /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx("div", {
        className: classNames(turn > 0 ? classes.nextPage : classes.prevPage, classes[direction]),
        children: /* @__PURE__ */ jsx("div", {
          children: children[turn > 0 ? Math.ceil(selected) : Math.floor(selected)]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: classNames(turn > 0 ? classes.nextPage : classes.prevPage, classes[direction]),
        style: {
          transform: getTransform(direction, turn),
          willChange: willChange ? "transform" : void 0
        },
        children: [/* @__PURE__ */ jsx("div", {
          children: children[Math.round(selected)]
        }), /* @__PURE__ */ jsx("div", {
          className: classes.shadow,
          children: /* @__PURE__ */ jsx(ShadowComponent, {
            selected,
            willChange
          })
        })]
      })]
    })]
  });
};
const FlippingPagesCore = memo(_FlippingPagesCore);
const defaultPerspectiveMultiplier = 2;
const _FlippingPagesWithPerspective = (props) => {
  const {
    direction,
    perspectiveMultiplier = defaultPerspectiveMultiplier
  } = props;
  const {
    ref,
    height,
    width
  } = useResizeObserver();
  const containerRef = useMemo(() => {
    const refs = [ref];
    if (props.containerRef) {
      refs.push(props.containerRef);
    }
    return mergeRefs(refs);
  }, [ref, props.containerRef]);
  const perspective = useMemo(() => {
    switch (direction) {
      case "bottom-to-top":
      case "top-to-bottom":
        if (!height) {
          return;
        }
        return height * perspectiveMultiplier;
      case "left-to-right":
      case "right-to-left":
        if (!width) {
          return;
        }
        return width * perspectiveMultiplier;
    }
  }, [direction, perspectiveMultiplier, height, width]);
  const containerProps = useMemo(() => ({
    ...props.containerProps,
    style: {
      perspective,
      ...props.containerProps?.style
    }
  }), [props.containerProps, perspective]);
  return /* @__PURE__ */ jsx(FlippingPagesCore, {
    ...props,
    containerProps,
    containerRef
  });
};
const FlippingPagesWithPerspective = memo(_FlippingPagesWithPerspective);
const useAnimation = (options) => {
  const { callback, onEnd, onStart } = options;
  const rafIdRef = useRef();
  const startTimeRef = useRef();
  const update = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      rafIdRef.current = requestAnimationFrame(update);
      return;
    }
    const timeElapsed = timestamp - startTimeRef.current;
    const end = callback(timeElapsed);
    if (end) {
      rafIdRef.current = void 0;
      onEnd();
    } else {
      rafIdRef.current = requestAnimationFrame(update);
    }
  }, [callback, onEnd]);
  const start = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    } else {
      onStart();
    }
    startTimeRef.current = void 0;
    rafIdRef.current = requestAnimationFrame(update);
  }, [onStart, update]);
  const stop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = void 0;
      onEnd();
    }
  }, [onEnd]);
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
  return { start, stop };
};
const defaultAnimationDuration = 400;
const _FlippingPagesWithAnimation = (props) => {
  const {
    animationDuration = defaultAnimationDuration,
    onAnimationEnd,
    onAnimationStart,
    onAnimationTurn
  } = props;
  const [animationRunning, setAnimationRunning] = useState(false);
  const willChange = useMemo(() => {
    if (typeof props.willChange === "boolean") {
      return props.willChange;
    }
    return animationRunning ? true : void 0;
  }, [props.willChange, animationRunning]);
  const startSelectedRef = useRef(0);
  const [selected, setSelected] = useState(props.selected);
  const onStart = useCallback(() => {
    setAnimationRunning(true);
    onAnimationStart?.();
  }, [onAnimationStart]);
  const onEnd = useCallback(() => {
    setAnimationRunning(false);
    onAnimationEnd?.();
  }, [onAnimationEnd]);
  const updateAnimation = useCallback((timeElapsed) => {
    const maxSelectedChange = props.selected - startSelectedRef.current;
    const selectedChange = Math.sign(maxSelectedChange) * timeElapsed / animationDuration;
    if (Math.abs(selectedChange) >= Math.abs(maxSelectedChange)) {
      setSelected(props.selected);
      return true;
    }
    const newSelected = startSelectedRef.current + selectedChange;
    setSelected(newSelected);
    onAnimationTurn?.(newSelected);
    return false;
  }, [animationDuration, onAnimationTurn, props.selected]);
  const {
    start,
    stop
  } = useAnimation({
    callback: updateAnimation,
    onEnd,
    onStart
  });
  useEffect(() => {
    if (selected === props.selected) {
      stop();
      return;
    }
    if (!animationDuration) {
      stop();
      setSelected(props.selected);
      return;
    }
    startSelectedRef.current = selected;
    start();
  }, [animationDuration, props.selected]);
  return /* @__PURE__ */ jsx(FlippingPagesWithPerspective, {
    ...props,
    selected,
    willChange
  });
};
const FlippingPagesWithAnimation = memo(_FlippingPagesWithAnimation);
const useMergeEvents = (...eventHandlers) => useCallback((event) => {
  for (const eventHandler of eventHandlers) {
    eventHandler?.(event);
  }
}, eventHandlers);
const useMergePointerEvents = (...eventsEmitters) => {
  const onPointerCancel = useMergeEvents(...eventsEmitters.map((eventsEmitter) => eventsEmitter?.onPointerCancel));
  const onPointerDown = useMergeEvents(...eventsEmitters.map((eventsEmitter) => eventsEmitter?.onPointerDown));
  const onPointerMove = useMergeEvents(...eventsEmitters.map((eventsEmitter) => eventsEmitter?.onPointerMove));
  const onPointerUp = useMergeEvents(...eventsEmitters.map((eventsEmitter) => eventsEmitter?.onPointerUp));
  return { onPointerCancel, onPointerDown, onPointerMove, onPointerUp };
};
const usePointerEvents = (options) => {
  const { onDown, onMove, onUp } = options;
  const [pointerId, setPointerId] = useState();
  const pointerDown = pointerId !== void 0;
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastTimeStampRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const currTimeStampRef = useRef(0);
  const currXRef = useRef(0);
  const currYRef = useRef(0);
  const onPointerDown = useCallback((event) => {
    if (!onDown(event)) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setPointerId(event.pointerId);
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    lastTimeStampRef.current = 0;
    currTimeStampRef.current = event.timeStamp;
    currXRef.current = event.clientX;
    currYRef.current = event.clientY;
  }, [onDown]);
  const onPointerMove = useCallback((event) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    lastTimeStampRef.current = currTimeStampRef.current;
    lastXRef.current = currXRef.current;
    lastYRef.current = currYRef.current;
    currTimeStampRef.current = event.timeStamp;
    currXRef.current = event.clientX;
    currYRef.current = event.clientY;
    const diffX = event.clientX - startXRef.current;
    const diffY = event.clientY - startYRef.current;
    onMove({ diffX, diffY });
  }, [onMove, pointerId]);
  const onPointerUp = useCallback((event) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    setPointerId(void 0);
    const diffX = event.clientX - startXRef.current;
    const diffY = event.clientY - startYRef.current;
    let speedX;
    let speedY;
    if (lastTimeStampRef.current) {
      const timeDiff = event.timeStamp - lastTimeStampRef.current;
      speedX = (event.clientX - lastXRef.current) / timeDiff;
      speedY = (event.clientY - lastYRef.current) / timeDiff;
    } else {
      speedX = 0;
      speedY = 0;
    }
    onUp({ diffX, diffY, speedX, speedY });
  }, [onUp, pointerId]);
  const onPointerCancel = useCallback((event) => {
    if (event.pointerId !== pointerId) {
      return;
    }
    setPointerId(void 0);
    const diffX = event.clientX - startXRef.current;
    const diffY = event.clientY - startYRef.current;
    onUp({ diffX, diffY, speedX: 0, speedY: 0 });
  }, [onUp, pointerId]);
  const cancelPointer = useCallback(() => {
    setPointerId(void 0);
  }, []);
  return {
    cancelPointer,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    pointerDown
  };
};
const getCurrSelected = (options) => {
  const { childrenLength, diffX, diffY, direction, onOverSwipe, startSelected, swipeLength } = options;
  let diff;
  switch (direction) {
    case "bottom-to-top":
      diff = -diffY;
      break;
    case "top-to-bottom":
      diff = diffY;
      break;
    case "left-to-right":
      diff = diffX;
      break;
    case "right-to-left":
      diff = -diffX;
      break;
  }
  let selected = startSelected + diff / swipeLength;
  selected = Math.max(selected, Math.ceil(startSelected) - 1);
  selected = Math.min(selected, Math.floor(startSelected) + 1);
  if (selected < 0) {
    const overSwipe = Math.min(-selected, 1);
    selected = -onOverSwipe(overSwipe);
  } else if (selected > childrenLength - 1) {
    const overSwipe = Math.min(selected - childrenLength + 1, 1);
    selected = childrenLength - 1 + onOverSwipe(overSwipe);
  }
  return selected;
};
const getNextSelected = (options) => {
  const { childrenLength, direction, speedX, speedY, startSelected, swipeSpeed } = options;
  const selected = getCurrSelected(options);
  let speed;
  switch (direction) {
    case "bottom-to-top":
      speed = -speedY;
      break;
    case "top-to-bottom":
      speed = speedY;
      break;
    case "left-to-right":
      speed = speedX;
      break;
    case "right-to-left":
      speed = -speedX;
      break;
  }
  let newSelected;
  if (Math.abs(speed) < swipeSpeed) {
    newSelected = Math.round(selected);
  } else if (speed > swipeSpeed) {
    newSelected = Math.floor(selected) + 1;
  } else {
    newSelected = Math.ceil(selected) - 1;
  }
  newSelected = Math.max(newSelected, Math.ceil(startSelected) - 1, 0);
  newSelected = Math.min(newSelected, Math.floor(startSelected) + 1, childrenLength - 1);
  return newSelected;
};
const defaultSwipeLength = 400;
const defaultOnOverSwipe = (overSwipe) => overSwipe / 4;
const defaultOnSwipeStart = (event) => event.isPrimary;
const defaultSwipeSpeed = 0.1;
const _FlippingPagesWithPointerControls = (props) => {
  const {
    children,
    direction,
    disableSwipe,
    noSwipeClass,
    onAnimationEnd: _onAnimationEnd,
    onAnimationStart: _onAnimationStart,
    onAnimationTurn: _onAnimationTurn,
    onOverSwipe = defaultOnOverSwipe,
    onSwipeEnd,
    onSwipeStart = defaultOnSwipeStart,
    onSwipeTurn,
    swipeLength = defaultSwipeLength,
    swipeSpeed = defaultSwipeSpeed
  } = props;
  const ref = useRef(null);
  const childrenLength = Children.count(children);
  const animationRunningRef = useRef(false);
  const startSelectedRef = useRef(props.selected);
  const [pointerSelected, setPointerSelected] = useState(props.selected);
  const onAnimationStart = useCallback(() => {
    animationRunningRef.current = true;
    _onAnimationStart?.();
  }, [_onAnimationStart]);
  const onAnimationTurn = useCallback((selected2) => {
    startSelectedRef.current = selected2;
    _onAnimationTurn?.(selected2);
  }, [_onAnimationTurn]);
  const onAnimationEnd = useCallback(() => {
    animationRunningRef.current = false;
    _onAnimationEnd?.();
  }, [_onAnimationEnd]);
  const onDown = useCallback((event) => {
    if (disableSwipe) {
      return false;
    }
    if (noSwipeClass) {
      if (event.target instanceof Element) {
        let target = event.target;
        while (target && target !== ref.current) {
          if (target.classList.contains(noSwipeClass)) {
            return false;
          }
          target = target.parentElement;
        }
      }
    }
    if (!onSwipeStart(event)) {
      return false;
    }
    if (!animationRunningRef.current) {
      startSelectedRef.current = props.selected;
    }
    setPointerSelected(startSelectedRef.current);
    return true;
  }, [disableSwipe, noSwipeClass, onSwipeStart, props.selected]);
  const onMove = useCallback((options) => {
    const {
      diffX,
      diffY
    } = options;
    const selected2 = getCurrSelected({
      childrenLength,
      diffX,
      diffY,
      direction,
      onOverSwipe,
      startSelected: startSelectedRef.current,
      swipeLength
    });
    setPointerSelected(selected2);
    onSwipeTurn?.(selected2);
  }, [childrenLength, direction, onOverSwipe, onSwipeTurn, swipeLength]);
  const onUp = useCallback((options) => {
    const {
      diffX,
      diffY,
      speedX,
      speedY
    } = options;
    const nextSelected = getNextSelected({
      childrenLength,
      diffX,
      diffY,
      direction,
      onOverSwipe,
      speedX,
      speedY,
      startSelected: startSelectedRef.current,
      swipeLength,
      swipeSpeed
    });
    onSwipeEnd?.(nextSelected);
  }, [childrenLength, direction, onOverSwipe, onSwipeEnd, swipeLength, swipeSpeed]);
  const {
    cancelPointer,
    pointerDown,
    ..._pointerEventListeners
  } = usePointerEvents({
    onDown,
    onMove,
    onUp
  });
  useEffect(() => {
    if (disableSwipe) {
      cancelPointer();
    }
  }, [cancelPointer, disableSwipe]);
  const animationDuration = pointerDown ? 0 : props.animationDuration;
  const selected = pointerDown ? pointerSelected : props.selected;
  const willChange = useMemo(() => {
    if (typeof props.willChange === "boolean") {
      return props.willChange;
    }
    return pointerDown ? true : void 0;
  }, [pointerDown, props.willChange]);
  const pointerEventListeners = useMergePointerEvents(_pointerEventListeners, props.containerProps);
  const containerProps = useMemo(() => ({
    ...props.containerProps,
    ...pointerEventListeners
  }), [pointerEventListeners, props.containerProps]);
  const containerRef = useMemo(() => {
    const refs = [ref];
    if (props.containerRef) {
      refs.push(props.containerRef);
    }
    return mergeRefs(refs);
  }, [props.containerRef]);
  return /* @__PURE__ */ jsx(FlippingPagesWithAnimation, {
    ...props,
    animationDuration,
    containerProps,
    containerRef,
    onAnimationEnd,
    onAnimationStart,
    onAnimationTurn,
    selected,
    willChange
  });
};
const FlippingPagesWithPointerControls = memo(_FlippingPagesWithPointerControls);
const FlippingPages = FlippingPagesWithPointerControls;
FlippingPages.displayName = "FlippingPages";
export { FlippingPages };
