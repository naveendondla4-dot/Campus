const KEY="campusBuddyData";
const defaultData={
  assignments:[
    {id:1,title:"Python Mini Project",subject:"Python",due:"2026-10-06",done:false},
    {id:2,title:"DBMS SQL Queries",subject:"DBMS",due:"2026-10-05",done:false},
    {id:3,title:"Java OOP Notes",subject:"Java",due:"2026-10-10",done:true}
  ],
  notes:[
    {id:1,title:"Python Unit 1 Notes",subject:"Python",text:"Variables, data types, operators and basic syntax."},
    {id:2,title:"DBMS Important Questions",subject:"DBMS",text:"Normalization, SQL, keys and transactions."},
    {id:3,title:"Java OOP Revision",subject:"Java",text:"Classes, objects, inheritance and polymorphism."}
  ],
  notices:[
    {id:1,title:"Internal Exams Schedule",text:"Internal exams timetable will be shared in class group.",date:"Oct 03"},
    {id:2,title:"College Tech Fest",text:"Registrations are open for the upcoming technical events.",date:"Oct 02"}
  ],
  tasks:[{id:1,text:"Complete DBMS assignment",done:false},{id:2,text:"Revise Python Unit 2",done:false}],
  polls:[
    {id:1,q:"Tomorrow lab session unda?",opts:["Yes","No"],votes:[4,1]},
    {id:2,q:"Which topic should we revise together?",opts:["Python","DBMS","Java"],votes:[5,3,2]}
  ],
  profile:{name:"Naveen",course:"B.Tech",branch:"Computer Science",year:"3rd Year"}
};
let data=JSON.parse(localStorage.getItem(KEY)||"null")||defaultData;
function save(){localStorage.setItem(KEY,JSON.stringify(data))}
const content=document.getElementById("content");
const title=document.getElementById("pageTitle");
const dateEl=document.getElementById("todayDate");
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function today(){return new Date().toISOString().slice(0,10)}
function fmt(d){return new Date(d+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short"})}
function nav(){document.querySelectorAll(".nav[data-page]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.page);document.getElementById("sidebar").classList.remove("open")})}
function render(page="dashboard"){
 dateEl.textContent=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 const titles={dashboard:"Good morning 👋",timetable:"My Timetable",assignments:"Assignments",notes:"Study Notes",notices:"College Notices",polls:"Class Polls",tasks:"My Tasks",profile:"My Profile"};
 title.textContent=titles[page]||"Campus Buddy";
 ({dashboard, timetable, assignments, notes, notices, polls, tasks, profile}[page]||dashboard)();
}
function dashboard(){
 const pending=data.assignments.filter(x=>!x.done).length, tasks=data.tasks.filter(x=>!x.done).length;
 content.innerHTML=`<div class="hero"><div><h2>Welcome back, ${esc(data.profile.name)}! 👋</h2><p>Your college day, organized in one place.</p></div><div class="date">${new Date().getDate()}<small> ${new Date().toLocaleDateString("en-IN",{month:"short"})}</small></div></div>
 <div class="grid">
  <div class="card stat">📚<small>Today's Classes</small><b>4</b></div>
  <div class="card stat">📝<small>Pending Assignments</small><b>${pending}</b></div>
  <div class="card stat">🔔<small>New Notices</small><b>${data.notices.length}</b></div>
  <div class="card stat">✅<small>Tasks Left</small><b>${tasks}</b></div>
 </div>
 <div class="layout">
  <div class="card"><div class="card-title"><h3>📅 Today's Timetable</h3><button class="link" onclick="render('timetable')">View all</button></div>
   ${["09:00 AM|Python|Room 204","10:00 AM|DBMS|Lab 2","11:30 AM|Java|Room 107","02:00 PM|Mathematics|Room 301"].map(x=>{let a=x.split("|");return `<div class="item"><div class="time">${a[0]}</div><div><b>${a[1]}</b><div class="muted">${a[2]}</div></div></div>`}).join("")}
  </div>
  <div class="card"><div class="card-title"><h3>📝 Upcoming</h3><button class="link" onclick="render('assignments')">Assignments</button></div>
   ${data.assignments.filter(x=>!x.done).slice(0,3).map(x=>`<div class="item"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.subject)} · Due ${fmt(x.due)}</div></div></div>`).join("")||'<div class="empty">No pending assignments 🎉</div>'}
  </div>
 </div>
 <div class="layout section">
  <div class="card"><div class="card-title"><h3>🔔 Latest Notices</h3><button class="link" onclick="render('notices')">View all</button></div>
  ${data.notices.slice(0,3).map(x=>`<div class="item"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.text)}</div></div><span class="badge">${esc(x.date)}</span></div>`).join("")}</div>
  <div class="card"><div class="card-title"><h3>✅ Quick Tasks</h3><button class="link" onclick="render('tasks')">Manage</button></div>
  ${data.tasks.slice(0,4).map(x=>`<label class="item task"><input type="checkbox" ${x.done?"checked":""} onchange="toggleTask(${x.id})"><span class="${x.done?'muted':''}">${esc(x.text)}</span></label>`).join("")}</div>
 </div>`;
}
function timetable(){
 const rows=[["Monday","09:00 AM","Python","Room 204"],["Monday","10:00 AM","DBMS","Lab 2"],["Tuesday","09:00 AM","Java","Room 107"],["Tuesday","11:30 AM","Mathematics","Room 301"],["Wednesday","10:00 AM","Python","Lab 1"],["Thursday","09:00 AM","DBMS","Room 204"],["Friday","02:00 PM","Java","Room 107"]];
 content.innerHTML=`<div class="card"><div class="card-title"><h3>Weekly Schedule</h3><span class="badge">Updated today</span></div>${rows.map(r=>`<div class="item"><div class="time">${r[0]}</div><div><b>${r[2]}</b><div class="muted">${r[1]} · ${r[3]}</div></div></div>`).join("")}</div>`;
}
function assignments(){
 content.innerHTML=`<div class="card"><div class="card-title"><h3>Track your work</h3><button class="btn" onclick="addAssignment()">+ Add Assignment</button></div>${data.assignments.map(x=>`<div class="item row"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.subject)} · Due ${fmt(x.due)}</div></div><div><span class="badge ${x.done?'green':'orange'}">${x.done?'Completed':'Pending'}</span> <button class="btn small secondary" onclick="toggleAssignment(${x.id})">${x.done?'Undo':'Done'}</button></div></div>`).join("")||'<div class="empty">No assignments</div>'}</div>`;
}
function addAssignment(){
 const title=prompt("Assignment title:"); if(!title)return;
 const subject=prompt("Subject:")||"General"; const due=prompt("Due date (YYYY-MM-DD):",today())||today();
 data.assignments.push({id:Date.now(),title,subject,due,done:false});save();toast("Assignment added");render("assignments");
}
function toggleAssignment(id){const x=data.assignments.find(a=>a.id===id);x.done=!x.done;save();render("assignments")}
function notes(){
 content.innerHTML=`<div class="card"><div class="card-title"><h3>Subject Notes</h3><button class="btn" onclick="addNote()">+ Add Note</button></div><input class="search" id="noteSearch" placeholder="Search notes..." oninput="filterNotes()"><div id="noteList">${noteItems(data.notes)}</div></div>`;
}
function noteItems(arr){return arr.map(x=>`<div class="item"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.subject)}</div><p>${esc(x.text)}</p></div><button class="btn small secondary" onclick="deleteNote(${x.id})">Delete</button></div>`).join("")||'<div class="empty">No notes found</div>'}
function filterNotes(){const q=document.getElementById("noteSearch").value.toLowerCase();document.getElementById("noteList").innerHTML=noteItems(data.notes.filter(x=>(x.title+x.subject+x.text).toLowerCase().includes(q)))}
function addNote(){const title=prompt("Note title:");if(!title)return;const subject=prompt("Subject:")||"General";const text=prompt("Short note:")||"";data.notes.push({id:Date.now(),title,subject,text});save();render("notes")}
function deleteNote(id){data.notes=data.notes.filter(x=>x.id!==id);save();render("notes")}
function notices(){content.innerHTML=`<div class="card"><div class="card-title"><h3>College Announcements</h3><span class="badge">${data.notices.length} updates</span></div>${data.notices.map(x=>`<div class="item"><div><b>${esc(x.title)}</b><div class="muted">${esc(x.date)}</div><p>${esc(x.text)}</p></div></div>`).join("")}</div>`}
function polls(){content.innerHTML=`<div class="cards">${data.polls.map(x=>{let total=x.votes.reduce((a,b)=>a+b,0);return `<div class="card"><h3>${esc(x.q)}</h3>${x.opts.map((o,i)=>`<div class="poll-option"><button class="btn small secondary" onclick="vote(${x.id},${i})">Vote</button><span>${esc(o)}</span><span class="muted" style="margin-left:auto">${x.votes[i]} votes</span></div>`).join("")}<div class="muted">${total} total votes</div></div>`}).join("")}</div><div class="card section"><button class="btn" onclick="addPoll()">+ Create Class Poll</button></div>`}
function vote(id,i){const p=data.polls.find(x=>x.id===id);p.votes[i]++;save();toast("Vote recorded");render("polls")}
function addPoll(){const q=prompt("Question:");if(!q)return;const opts=(prompt("Options separated by comma:")||"Yes,No").split(",").map(x=>x.trim()).filter(Boolean);data.polls.push({id:Date.now(),q,opts,votes:opts.map(()=>0)});save();render("polls")}
function tasks(){content.innerHTML=`<div class="card"><div class="card-title"><h3>My Daily Tasks</h3><button class="btn" onclick="addTask()">+ Add Task</button></div>${data.tasks.map(x=>`<div class="item row"><label class="task"><input type="checkbox" ${x.done?"checked":""} onchange="toggleTask(${x.id})"><span class="${x.done?'muted':''}">${esc(x.text)}</span></label><button class="btn small danger" onclick="deleteTask(${x.id})">Delete</button></div>`).join("")||'<div class="empty">Nothing planned. Add a task!</div>'}</div>`}
function addTask(){const t=prompt("Task:");if(!t)return;data.tasks.push({id:Date.now(),text:t,done:false});save();render("tasks")}
function toggleTask(id){const x=data.tasks.find(t=>t.id===id);x.done=!x.done;save(); if(document.querySelector(".task")) render(locationPage())}
function deleteTask(id){data.tasks=data.tasks.filter(x=>x.id!==id);save();render("tasks")}
function locationPage(){return document.querySelector(".nav.active")?.dataset.page||"dashboard"}
function profile(){content.innerHTML=`<div class="card"><div class="card-title"><h3>Profile</h3><button class="btn" onclick="editProfile()">Edit</button></div><div class="item"><b>Name</b><span>${esc(data.profile.name)}</span></div><div class="item"><b>Course</b><span>${esc(data.profile.course)}</span></div><div class="item"><b>Branch</b><span>${esc(data.profile.branch)}</span></div><div class="item"><b>Year</b><span>${esc(data.profile.year)}</span></div></div>`}
function editProfile(){const n=prompt("Name:",data.profile.name);if(n)data.profile.name=n;const b=prompt("Branch:",data.profile.branch);if(b)data.profile.branch=b;save();render("profile")}
document.getElementById("themeBtn").onclick=()=>{document.documentElement.classList.toggle("dark");localStorage.setItem("cbDark",document.documentElement.classList.contains("dark"))}
document.getElementById("menuBtn").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
if(localStorage.getItem("cbDark")==="true")document.documentElement.classList.add("dark");
nav();render("dashboard");
