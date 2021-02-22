const fixEle=Value=>{
  if(typeof Value==='function'||typeof Value?.render==='function'){
    return <Value />;
  }
  if(typeof Value==='string'){
    return <i className={Value} />;
  }
  return Value||null;
};

export default fixEle;