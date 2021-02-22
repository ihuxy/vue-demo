import {ref,toRef,toRefs,onMounted,reactive,watch,watchEffect} from 'vue';
// import Topbar from '../topbar';
import Header from '../header';
import Footer from '../footer';
import Main from '../main';
import {utils} from '@common';
// import getThemeList from '@commonCfg/theme';
import getThemeList from '@app/configs/theme';
import './index.less';
const {storage,a2o}=utils;

const formatMenu=(menu,curPath,type='sideMenu',cb=null)=>{
  const menuConfig={
    sideMenu:null,
    navMenu:null,
  };
  if(type==='navMenu'){
    menuConfig[type]=menu.length>1?menu:menu[0]?.children;
    return menuConfig;
  }
  const navMenu=menu.map(v=>{
    const {children,...rest}=v;
    if(v.path===curPath){
      menuConfig.sideMenu=children;
    }
    return rest;
  });
  menuConfig.navMenu=menu.length>1?navMenu:null;
  return menuConfig;
};

const Index=props=>{
  const {store}=props;
  const themeList=getThemeList(store?.getState('langCfg')?.theme);
  const menuType=ref('sideMenu');
  const collapsed=ref(false);

  const theme=ref(storage.get('theme')||themeList[0]);
  onMounted(()=>{
    const {subscribe}=store??{};
    if(subscribe){
      subscribe('set-theme',result=>{
        const list=result.theme;
        const newTheme={
          name:'自定义',
          key:'custom',
          list,
        };
        storage.set('theme',newTheme);
        theme.value=newTheme;
      });
      subscribe('set-menuType',result=>menuType.value=result.menuType?'navMenu':'sideMenu');
    }
  });
  const switchTheme=type=>{
    const current=themeList.find(v=>v.key===type)||themeList[0];
    storage.set('theme',current);
    theme.value=current;
  };
  const handleCollapse=status=>collapsed.value=status==null?!collapsed.value:status;

  // const {sideMenu,navMenu}=formatMenu(menu,current[0]?.path,menuType.value);

  return ()=><div className={`frame${collapsed.value?' collapsed':''}`} style={a2o(theme.value.list)}>
    <header className="frame-header">
      {/* <Topbar {...props} /> */}
      <Header {...props} handleCollapse={handleCollapse} collapsed={collapsed} switchTheme={switchTheme} theme={theme} menuType={menuType} />
    </header>
    <main className="frame-main">
      <Main {...props} collapsed={collapsed} handleCollapse={handleCollapse} menuType={menuType} />
    </main>
    <footer className="frame-footer">
      <Footer />
    </footer>
  </div>;
};

const Frame={
  props:{
    menu:[],
    current:[],
    inputPath:'',
    children:{},
    store:{},
    updateRouter:()=>{},
    eventBus:{},
  },
  setup:Index,
};

export default Frame;

