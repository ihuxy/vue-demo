import {ref,toRefs,onMounted,reactive,watch,watchEffect} from 'vue';
import {utils,use} from '@common';
import fixEle from '@utils/fixEle';
const {traverItem}=utils;
const {useClickAway}=use;

const setupNavItem=props=>{
  const {click,item,collapsed}=props;
  const navRef=ref();
  const open=ref(false);
  const {Custom,img,name,icon,children,Ricon,active,arrowDir}=item;
  const hasChildren=children?.length;
  useClickAway(navRef,e=>open.value=false);
  const toggleNav=(e,item)=>{
    // e.stopPropagation();
    open.value=!open.value;
    click(item);
  };
  const itemClick=(e,item,isChild=false)=>{
    open.value=false;
    click(item,isChild);
  };
  const ri=Ricon===true?<i className={`huxy-angle-${open.value?'top':'bt'}`} />:(Ricon?<Ricon status={open.value} />:null);
  const itemEl=Custom?<Custom status={collapsed} />:img?<div className="avatar">
    <img src={img} alt="avatar" />
    {name?<span className="txt">{name}</span>:null}
    {ri}
  </div>:<>
    {fixEle(icon)}
    {name?<span className="txt">{name}</span>:null}
    {ri}
  </>;
  return ()=>hasChildren?<li ref={navRef}>
    <a onClick={e=>toggleNav(e,item)} className={active?'active':''}>{itemEl}</a>
    <ul className={`huxy-arrow-${arrowDir||'rt'}${open.value?' show':''}`}>
      {
        children.map(v=><li key={v.name}>
          <a onClick={e=>itemClick(e,v,true)} className={v.active?'active':''}>
            {fixEle(v.icon)}
            <span style={{display:'inline-block'}}>{v.name}</span>
          </a>
        </li>)
      }
    </ul>
  </li>:<li>
    <a onClick={e=>itemClick(e,item)} className={active?'active':''}>{itemEl}</a>
  </li>;
};
const NavItem={
  props:{
    item:{},
    collapsed:false,
    click:()=>{},
  },
  setup:setupNavItem,
};

const Index=({list,click,collapsed})=>{
  const updateList=item=>{
    const newData=traverItem(v=>{
      if(item.name===v.name){
        v.active=!item.active;
      }else{
        v.active=false;
      }
    })(list.value);
    list.value=newData;
  };
  const handleClick=(item,update)=>{
    if(update){
      updateList(item);
    }
    click(item);
  };
  return ()=><ul>
    {
      list.value.map(v=><NavItem key={v.name} click={handleClick} item={v} collapsed={collapsed} />)
    }
  </ul>;
};

const NavList={
  props:{
    list:[],
    collapsed:false,
    click:()=>{},
  },
  setup:Index,
};

export default NavList;


