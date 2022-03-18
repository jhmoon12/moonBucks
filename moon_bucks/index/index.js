//step1 요구사향 구현을 위한 전략
//리팩터링?


const $ = (selector) => document.querySelector(selector);



function App () {
  // 상태(변하는 데이터) - 갯수, 메뉴명
  

    /* 변수 모음 */
    const updateMenuCount= () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll('li').length;
        $('.menu-count').innerText = `총 ${menuCount} 개`;
    }
    const addMenuName = () => {
        if($('#espresso-menu-name').value === ""){
            alert('값을 입력하세요');
            return;
        }//빈값일 때 아무 키나 눌러도 값을 입력하세요라고 뜬다?, alert 창을 눌렀을 때 엔터를 눌러서
        
            const espressoMenuName = $('#espresso-menu-name').value;
          
            const menuItemTemplate = (espressoMenuName) => {
                return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
            };
            $("#espresso-menu-list").insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
            updateMenuCount();
            $('#espresso-menu-name').value = ""; //자바스크립트는 순서대로 읽기 때문에 value 값을 빈값으로 처리 가능
    };
    const updateMenuName = (e) => {
        const $menuName = e.target.closest('li').querySelector('.menu-name')
        //해당 이벤트 타겟의 가까운 li 가 가지고 있는 요소들 중 클래스 네임이 menu-name 인 것을 가져옴
        const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
        $menuName.innerText = updatedMenuName
    }
    const removeMenuName = (e) => {
        if (confirm('정말 삭제하시겠습니까?')){
            e.target.closest('li').remove(); //삭제 매서드
            updateMenuCount();
           }
    }


    /* 이벤트 위임 , 리스트 수정과 삭제 */
    $('#espresso-menu-list').addEventListener('click',(e)=>{
       if(e.target.classList.contains('menu-edit-button')){
        updateMenuName(e);
       } 
       if(e.target.classList.contains('menu-remove-button')){
        removeMenuName(e);
       }
    });

    //form 태그가 자동으로 전송되는 것을 막아준다.
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
      });

    /* 버튼을 클릭했을 때 */  
    $('#espresso-menu-submit-button').addEventListener('click',addMenuName) //<함수만 들어가있다면 이렇게 작성
  
    /* 엔터를 쳤을 때 */
    $('#espresso-menu-name').addEventListener("keypress", (e) => {
        if(e.key !== 'Enter'){
            return;
        }//키값이 엔터가 아닐 때 반환
        addMenuName();
        
    });
    

};
App ();

//엔터 시와 클릭 시 