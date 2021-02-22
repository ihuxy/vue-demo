import {ref,toRefs,onMounted,reactive,watch,watchEffect} from 'vue';
import {Link} from '@common';

const ulStyles={
  overflow:'hidden',
  maxHeight:'var(--ul-max-height)',
  transition:'max-height .3s',
};
const setupRenderChild=({item},{attrs,slots,emit})=>{
  const ul=ref();
  onMounted(()=>{
    const el=ul.value;
    const height=item.open?`${el.scrollHeight}px`:'0px';
    // el.style.transition='none';
    el.style.setProperty('--ul-max-height',height);
  });
  watch([()=>item.open,()=>item.children?.length],([open,prevOpen],[len,prevLen])=>{
    const el=ul.value;
    const initH=open?'0px':`${el.scrollHeight}px`;
    el.style.setProperty('--ul-max-height',initH);
    setTimeout(()=>{
      const height=open?`${el.scrollHeight}px`:'0px';
      // el.style.transition='';
      el.style.setProperty('--ul-max-height',height);
    },5);
  });
  watch(()=>item.uuid,(uuid,prevUuid)=>{
    if(uuid){
      const el=ul.value;
      el.style.setProperty('--ul-max-height','none');
    }
  });
  return ()=><ul ref={ul} style={ulStyles}>{slots.default()}</ul>;
};

const RenderChild={
  props:{
    item:{},
  },
  setup:setupRenderChild,
};

export const render=(data,toggle)=>data.map(v=>{
  const hasChildren=v.children?.length;
  const active=v.active?'active':'';
  if(hasChildren){
    return <li key={v.name} onClick={e=>toggle(e,v)} has-children="true" className={v.open?'open':''}>
      <Link to={v.path} className={active} preventDefault>
        {typeof v.icon==='string'?<i className={v.icon} />:(v.icon||null)}
        <span className="txt has-right-icon">{v.name}</span>
        <i className="coll-ico" />
      </Link>
      <RenderChild item={v}>{render(v.children,toggle)}</RenderChild>
    </li>;
  }
  return <li key={v.name}>
    <Link to={v.path} stopPropagation className={active}>
      {typeof v.icon==='string'?<i className={v.icon} />:(v.icon||null)}
      <span className="txt">{v.name}</span>
    </Link>
  </li>;
});

export const renderCollapsed=data=>data.map(v=>{
  const hasChildren=v.children?.length;
  const active=v.active?'active':'';
  if(hasChildren){
    return <li key={v.name} has-children="true">
      <Link to={v.path} className={active} preventDefault>
        {typeof v.icon==='string'?<i className={v.icon} />:(v.icon||null)}
        <span className="txt has-right-icon">{v.name}</span>
        <i className="coll-ico" />
      </Link>
      <ul>{renderCollapsed(v.children)}</ul>
    </li>;
  }
  return <li key={v.name}>
    <Link to={v.path} stopPropagation className={active}>
      {typeof v.icon==='string'?<i className={v.icon} />:(v.icon||null)}
      <span className="txt">{v.name}</span>
    </Link>
  </li>;
});

