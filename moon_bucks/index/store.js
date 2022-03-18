const store = {
    setLocalStorage(menu) {
      localStorage.setItem('menu', JSON.stringify(menu));
    },
    getLocalStorage() {
      return JSON.parse(localStorage.getItem('menu'));
    },
  };
  /* 
  JSON.parse() 제이슨 객체로 변환해주는 매서드 
  JSON.stringify() 제이슨 문자열로 변환해주는 매서드
  */

export default store;
  