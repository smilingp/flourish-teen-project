const postForm = document.getElementById('postForm');
const threadsSection = document.getElementById('threads');
let threads = JSON.parse(localStorage.getItem('threads'))||[];
function saveThreads(){
    localStorage.setItem('threads',JSON.stringify('threads'));
}
function renderThreads(){
    threadsSection.innerHTML='';
    threads.forEach((thread,index)=> {const threadDiv = document.createElement('div');
        threadDiv.className='thread';
        threadDiv.innerHTML=`
        <h3>${thread.title}</h3>
        <p class="meta">Posted Just now</p>
        <p>${thread.description}</p>

        <div id="replies-${index}">
        ${thread.replies.map(reply => `<div class="reply">${reply}</div>`).join('')}
        </div>
        <form class="reply-form" onsubmit="postReply(event, ${index})">
        <textarea placeholder="Write your reply..." required></textarea>
        <button type="submit">Post Reply</button>
        </form>
        `;
        threadsSection.appendChild(threadDiv);
    });
}
postForm.addEventListener('submit',(e)=>{e.preventDefault();
    const title = document.getElementById('questionTitle').value.trim();
    const description = document.getElementById('questionDesc').value.trim();
    if (title && description) {
        threads.unshift({title,description,replies:[]});
        saveThreads();
        renderThreads();
        postForm,reset();
    }
    
});
function postReply(e, threadIndex){
    e.preventDefault();
    const textarea = e.target.querrySelector('textarea');
    const replyText = textarea.value.trim();
    if (replyText){
        threads[threadIndex].replies.push(replyText);
        savesThreads();
        renderThreads();
    }
}
renderThreads();