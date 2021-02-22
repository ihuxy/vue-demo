import {ref,onMounted,reactive,watch,watchEffect} from 'vue';
import {useRouter,components,utils} from '@common';

import i18ns from '@app/i18n';
import configs from '@app/configs';
import getPermission from '@app/configs/mockKeys';
import permRouter from '@app/utils/permRouter';
import routers,{whiteRouters} from './router';

const {Spinner}=components;
const {storage}=utils;

const setupConfig=props=>{
  const {permission}=props;
  const language=storage.get('language')||'zh';
  const {router,title}=i18ns[language];
  const {output,loading,store,updateRouter}=useRouter({...configs,routers:permRouter(routers(router),permission),title});
  onMounted(()=>{
    const {subscribe,setState}=store;
    setState({permission});
    setState({langCfg:{...i18ns[language],language}});
    subscribe('update-router',result=>{
      updateRouter({routers:result.menu,exact:true});
    });
    subscribe('change-language',language=>{
      storage.set('language',language);
      const {router,title}=i18ns[language];
      setState({langCfg:{...i18ns[language],language}});
      updateRouter({routers:permRouter(routers(router),permission),title});
    });
  });
  return ()=><>
    {output.value}
    {loading.value&&<Spinner global />}
  </>;
};

const ConfigProvider={
  props:{
    permission:[],
  },
  setup:setupConfig,
};

const setup=()=>{
  const permission=ref();
  onMounted(()=>{
    const getPerm=async ()=>{
      try{
        const {permList}=await getPermission({time:+new Date()});
        permission.value=permList||[];
      }catch(err){
        permission.value=[];
      }
    };
    getPerm();
  });
  return ()=>!permission.value?<Spinner global />:!permission.value.length?<div>403</div>:<ConfigProvider permission={permission.value} />;
};

const App={
  props:{},
  setup,
};

export default App;


