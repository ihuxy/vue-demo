import {onMounted,onUnmounted,watch,ref} from 'vue';
import {Link,utils} from '@common';
import Menu from '../menu';
import './index.less';
const {addClass,removeClass}=utils;
// const getSecoudMenu=menu=>menu.find(v=>v.open)?.children??[];
export const breadcrumb=(current,bread)=><div className="breadcrumb">
  <span style={{float:'left'}}>{bread}：</span>
  <ul>
    {current.filter(v=>v.name).map(v=>v.path!=='/'&&<li key={v.path}><Link to={v.path}>{v.name}</Link></li>)}
  </ul>
</div>;

const time=350;
const Index=props=>{
  // const {menu,collapsed,handleCollapse,store}=props;
  // const langCfg=store?.getState('langCfg')??{};
  // const {main:{bread}}=langCfg;
  const hasMenu=props.menu?.length;
  const style=hasMenu?null:{paddingLeft:0};

  const viewRef=ref();
  const pathRef=ref(props.current.slice(-1)[0]?.path);
  const timer=ref();
  watch(()=>props.current,(current,prev,onInvalidate)=>{
    const curPath=current.slice(-1)[0]?.path;
    if(curPath!==pathRef.value){
      pathRef.value=curPath;
      addClass(viewRef.value,'ani-in');
      timer.value=setTimeout(()=>{
        removeClass(viewRef.value,'ani-in');
      },time);
    }
    onInvalidate(()=>{
      clearTimeout(timer.value);
    });
  });
  return ()=><div className="frame-container">
    {
      hasMenu?<aside className="frame-aside">
        <Menu {...props} curPath={pathRef} />
      </aside>:null
    }
    <div className="frame-view" style={style}>
      <div className="page-container">
        {breadcrumb(props.current||[],props.store.getState('langCfg')?.main.bread)}
        <div className="content" ref={viewRef}>
          {props.children}
        </div>
      </div>
    </div>
  </div>;
};

const Main={
  props:{
    menu:[],
    menuType:'',
    current:[],
    curPath:'',
    collapsed:false,
    handleCollapse:()=>{},
    store:{},
    children:{},
  },
  setup:Index,
};

export default Main;



