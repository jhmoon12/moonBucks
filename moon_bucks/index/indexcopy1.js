
//import { $ } from "./dom.js";
//import store from "store.js"


const $ = (selector) => document.querySelector(selector);

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


const BASE_URL = "http://localhost:3000/api" //웹서버

//fetch('http://localhost:3000/api', option)
//첫번째 인자 : 주소 , 두번째 인자 : 상세한 방법,옵션




function App () {
  // 상태(변하는 데이터) - 갯수, 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],

  }; // 상태값 선언
  this.currentCategory = 'espresso'
  this.init = () => {
    if(store.getLocalStorage()){
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListerners();
  };
  const render = () => {
      const template = this.menu[this.currentCategory] 
        .map((item, index) => {
          return `<li data-menu-id="${index}" class="
          menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name
            ${item.soldOut ? 'sold-out' : ''
          }">${item.name}</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
              품절
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
            </button>
          </li>`
        })
        .join('');//배열 상태로 넣을 수 없기 때문에 join 매서드를 써준다.

        $("#menu-list").innerHTML = template;
        updateMenuCount();
  }

    /* 변수 모음 */
    const updateMenuCount= () => {
        const menuCount = this.menu[this.currentCategory].length;
        $('.menu-count').innerText = `총 ${menuCount} 개`;
    }
    const addMenuName = () => {
        if($('#menu-name').value === ""){
            alert('값을 입력하세요');
            return;
        }//빈값일 때 아무 키나 눌러도 값을 입력하세요라고 뜬다?, alert 창을 눌렀을 때 엔터를 눌러서
            const MenuName = $('#menu-name').value;
            this.menu[this.currentCategory].push({ name: MenuName}); // 키값을 []로 표현하자
            store.setLocalStorage(this.menu);
            render();
            
            $('#menu-name').value = ""; //자바스크립트는 순서대로 읽기 때문에 value 값을 빈값으로 처리 가능
    };
    const updateMenuName = (e) => {
        const menuId = e.target.closest('li').dataset.menuId;
        const $menuName = e.target.closest('li').querySelector('.menu-name')
        //해당 이벤트 타겟의 가까운 li 가 가지고 있는 요소들 중 클래스 네임이 menu-name 인 것을 가져옴
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        this.menu[this.currentCategory][menuId].name = updatedMenuName;
        store.setLocalStorage(this.menu);
        render();
    }
    const removeMenuName = (e) => {
        if (confirm('정말 삭제하시겠습니까?')){
            const menuId = e.target.closest('li').dataset.menuId;
            this.menu[this.currentCategory].splice(menuId, 1);
            store.setLocalStorage(this.menu);
            render(); //삭제 매서드
            
           }
    }

    const soldOutMenu = (e) =>{
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
      store.setLocalStorage(this.menu);
      render();
    }

    const initEventListerners = () => {
      /* 이벤트 위임 , 리스트 수정과 삭제 */
    $('#menu-list').addEventListener('click',(e)=>{
      if(e.target.classList.contains('menu-edit-button')){
       updateMenuName(e);
       return
      } 
      if(e.target.classList.contains('menu-remove-button')){
       removeMenuName(e);
       return
      }
      if(e.target.classList.contains('menu-sold-out-button')){
        soldOutMenu(e);
        return
      }
   });

  

   //form 태그가 자동으로 전송되는 것을 막아준다.
   $("#menu-form").addEventListener("submit", (e) => {
       e.preventDefault();
     });

   /* 버튼을 클릭했을 때 */  
   $('#menu-submit-button').addEventListener('click',addMenuName) //<함수만 들어가있다면 이렇게 작성
 
   /* 엔터를 쳤을 때 */
   $('#menu-name').addEventListener("keypress", (e) => {
       if(e.key !== 'Enter'){
           return;
       }//키값이 엔터가 아닐 때 반환
       addMenuName();
       
   });
   $('nav').addEventListener('click', (e)=>{
     const isCategoryButton = e.target.classList.contains('cafe-category-name')
     if (isCategoryButton){
       const categoryName = e.target.dataset.categoryName;
       this.currentCategory = categoryName;
       $('#category-title').innerText = `${e.target.innerText} 메뉴관리`;
       render();
     }
   });

    }
    

};
const app = new App();
app.init();

//엔터 시와 클릭 시 