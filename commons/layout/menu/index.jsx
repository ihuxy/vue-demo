import {ref,toRefs,onMounted,reactive,watch,watchEffect} from 'vue';
import {utils,use} from '@common';
import {render,renderCollapsed} from '../components/render';
import './index.less';
const {useWinResize,useClickAway}=use;
const {getSelected,uuidv4,cacheData}=utils;

const {getList,record}=cacheData();

const Index=props=>{
  const {curPath,collapsed,handleCollapse}=props;
  // const data=ref(menu);
  const menuRef=ref();
  const {width}=useWinResize().value;
  useClickAway(menuRef,e=>{
    if(width<1024&&collapsed.value){
      handleCollapse(false);
    }
  });
  watch(curPath,(curPath,prevPath)=>{
    record(curPath||'/');
  });
  const toggle=(e,v)=>{
    e.stopPropagation();
    const selecteds=getSelected(props.menu,v.path,'path');
    selecteds.map(item=>item.path===v.path?item.open=!item.open:item.uuid=uuidv4());
  };

  return ()=><div className={`menu${collapsed.value?' collapsed':''}`} ref={menuRef}>
    <ul className="tree-root">
      {width>1024&&collapsed.value?renderCollapsed(props.menu):render(props.menu,toggle)}
    </ul>
    <div className="menu-btbar">
      <h4 className="btbar-title">history list</h4>
      <ul className="btbar-list">
        {
          getList().reverse().map(({data},i)=><li key={`${data}-${i}`}><a href={data}>{data}</a></li>)
        }
      </ul>
    </div>
  </div>;
};

const Menu={
  props:{
    menu:[],
    menuType:'',
    curPath:'',
    collapsed:false,
    handleCollapse:()=>{},
  },
  setup:Index,
};

export default Menu;


