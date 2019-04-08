export default (function() {
  const st = localStorage || { };
  console.log('storage:='+localStorage);
  return {
    set: (key, object) => {
      console.log('storage:set:key='+key+",obj="+object);
      st[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
    },
    get: (key) => {
      console.log('storage:get:key='+key);
      console.log(st[key]);
      if(!st[key]) {
        return null;
      }
      const value = st[key];

      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch(e) {
        return value;
      }
    },
    remove: (key) => {
      console.log('storage:remove:');
      if(localStorage) {
        return localStorage.removeItem(key);
      }
      delete st[key];
    }
  }
})();