

const $ = (select) => document.querySelector(select);

function App () {
    
    const addMenuName =() =>{
        if($('#espresso-menu-name').value === ''){
            alert('메뉴를 입력해주세요');
            return;
        }  
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
            $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
            const menuCount = $("#espresso-menu-list").querySelectorAll('li').length;
            $('.menu-count').innerText = `총 ${menuCount} 개`;
            $('#espresso-menu-name').value='';
            
        }
    const updatedMenuName = (e) =>{
        const $menuName = e.target.closest('li').querySelector('.menu-name')
        const updateMenuName = prompt('메뉴를 수정하세요', $menuName.innerText)
        $menuName.innerText = updateMenuName
        
    }
    const removeMenuName = (e) => {
        if(confirm('정말 삭제하시겠습니까?')){
            e.target.closest('li').remove();
            const menuCount = $("#espresso-menu-list").querySelectorAll('li').length;
            $('.menu-count').innerText = `총 ${menuCount} 개`;

        }
    }
    
    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
      });

      $('#espresso-menu-list').addEventListener('click', (e) =>{
          if(e.target.classList.contains('menu-edit-button')){
              updatedMenuName(e);
          }
          if(e.target.classList.contains('menu-remove-button')){
              removeMenuName(e);
          };
          
      });

    
        $('#espresso-menu-submit-button').addEventListener('click',addMenuName)
        $('#espresso-menu-name').addEventListener('keypress',(e)=>{
            if(e.key !== 'Enter'){
                return;
            }
            addMenuName();
        })


};

App();