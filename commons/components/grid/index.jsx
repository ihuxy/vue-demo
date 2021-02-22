import './index.less';

const gutterDef=[8,12,16,20];

const Row=({gutter=0,children,style,...rest})=>{
  let gtCls=' gutter';
  let styles={};
  if(gutter){
    if(gutterDef.includes(Number(gutter))){
      gtCls=`${gtCls}-${gutter}`;
    }else{
      styles={
        '--gutter':`${gutter}px`,
        ...style,
      };
    }
  }
  return (
    <div className={`row${gtCls}`} style={styles} {...rest}>
      {children}
    </div>
  );
};
export default Row;


const getCls=(type,size)=>{
  let sp='',os='';
  if(typeof size==='number'){
    sp=`col-${type}-${size}`;
  }
  if(typeof size==='object'){
    const {span,offset}=size;
    sp=span?`col-${type}-${span}`:``;
    os=offset?`offset-${type}-${offset}`:``;
  }
  return {sp,os};
};

export const Col=({span,offset,sm,xs,md,children,...rest})=>{
  const sp=span?`col-${span}`:``;
  const os=offset?`offset-${offset}`:``;
  const {sp:xs_sp,os:xs_os}=getCls('xs',xs);
  const {sp:sm_sp,os:sm_os}=getCls('sm',sm);
  const {sp:md_sp,os:md_os}=getCls('md',md);
  const cls=[sp,os,xs_sp,xs_os,sm_sp,sm_os,md_sp,md_os].filter(Boolean).join(' ');
  
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
};





