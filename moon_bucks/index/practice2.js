function App () {
    
  const addMenu = () => {
    if(document.querySelector('#input-menu').value === ''){
        alert('메뉴명을 입력해주세요');
        return;
    }
    
    const menuName = document.querySelector('#input-menu').value;
    const menuItem = (menuName) => {
        return (
             `<li class="menu-list">
                <span class="menu-name">${menuName}</span>
                <span>
            <button class="menu-edit-btn" id="update-btn">수정</button>
            <button class="menu-remove-btn" id="remove-btn">삭제</button>
            </span>
            </li>`
        );
    };
    document.querySelector('#menu-list_box').insertAdjacentHTML('beforeend',menuItem(menuName));
    const lengthText = document.querySelectorAll('li').length;
    document.querySelector('.menu-count_txt').innerText=`총 ${lengthText} 개`
    document.querySelector('#input-menu').value='';
  }
    

    document.querySelector('#btn-input').addEventListener('click',()=>{
        addMenu();
    });

    document.querySelector('#input-menu').addEventListener('keypress',(e)=>{
        if(e.key !== 'Enter'){
            return;
        }
        addMenu();
    });

    document.querySelector('#menu-list_box').addEventListener('click',(e)=>{
        if(e.target.classList.contains('menu-edit-btn')){
            const updateMenuName = e.target.closest('li').querySelector('.menu-name')
            const updatePrompt = prompt('메뉴명을 수정하세요', updateMenuName.innerText)
            updateMenuName.innerText= updatePrompt
        }
        if(e.target.classList.contains('menu-remove-btn')){
            if(confirm('메뉴를 삭제하시겠습니까?')){
                e.target.closest('li').remove();
                const lengthText = document.querySelectorAll('li').length;
                document.querySelector('.menu-count_txt').innerText=`총 ${lengthText} 개`
            }
        }
    });

    document.querySelector('#form-menu').addEventListener('submit',(e)=>{
        e.preventDefault();
    });




};
App();