import {ref,toRefs,onMounted,reactive,watch,watchEffect} from 'vue';
import {message} from 'ant-design-vue';
import {utils} from '@common';
// import {leftNav,rightNav} from '@commonCfg/nav';
import {leftNav,rightNav} from '@app/configs/nav';
import HoriMenu from '../components/horiMenu';
import NavList from '../components/navList';
import './index.less';
const {storage}=utils;

const Index=props=>{
  const {handleCollapse,collapsed,switchTheme,navMenu,user,theme,store}=props;
  // const langCfg=store?.getState('langCfg')??{};
  // const {title}=langCfg;
  const leftList=ref(leftNav({langCfg:store?.getState('langCfg')??{},themeKey:theme.value.key}));
  const rightList=ref(rightNav({langCfg:store?.getState('langCfg')??{},user:user?.result}));
  watch(props,(curProps,prevProps)=>{
    leftList.value=leftNav({langCfg:store?.getState('langCfg')??{},themeKey:theme.value.key});
    rightList.value=rightNav({langCfg:store?.getState('langCfg')??{},user:user?.result});
  });
  onMounted(()=>{
    const {subscribe,setState}=store||{};
    if(subscribe){
      subscribe('update-nav',result=>{
        const {type,data}=result;
        if(type==='left'){
          leftList.value=data;
          setState({'nav-data':{leftList:data}});
        }
        if(type==='right'){
          rightList.value=data;
          setState({'nav-data':{rightList:data}});
        }
      });
      setState({'nav-data':{leftList,rightList}});
    }
  });

  const handleNavClick=item=>{
    if(item.type==='link'){
      return window.open(item.link);
    }
    if(item.type==='language'){
      props.store.setState({'change-language':item.key});
    }
    if(item.type==='logout'){
      message.success('logout！');
      storage.rm('token');
      props.router.push(item.path);
    }
    if(item.type==='theme'){
      switchTheme(item.key);
    }
    if(item.type==='collapse'){
      handleCollapse();
    }
    if(typeof item.handle==='function'){
      item.handle(item);
    }
  };

  return ()=><div className="header">
    <div className="header-wrap">
      <div className="banner">
        {/* <div className="logo"><img src={logo} alt="logo" /></div> */}
        <div className="title">{store?.getState('langCfg')?.title}</div>
      </div>
      <div className="nav">
        <div className="nav-wrap">
          <div className="nav-left">
            <NavList list={leftList} click={handleNavClick} collapsed={collapsed} />
          </div>
          {navMenu?.length?<HoriMenu menu={navMenu} />:null}
          <div className="nav-right">
            <NavList list={rightList} click={handleNavClick} />
          </div>
        </div>
      </div>
    </div>
  </div>;
};

const Header={
  props:{
    user:{},
    navMenu:[],
    menu:[],
    menuType:'',
    handleCollapse:()=>{},
    switchTheme:()=>{},
    collapsed:false,
    theme:{},
    store:{},
  },
  setup:Index,
};

export default Header;






