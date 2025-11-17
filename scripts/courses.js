const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseDetails = document.querySelector('#course-details');
const grid = document.querySelector('.course-grid');


document.querySelectorAll('a.prevent').forEach(a =>
    a.addEventListener('click', e => e.preventDefault())
);


createCourseCard(courses);
CreateCourseCredits(courses);

const allLink = document.querySelector("#all");
const cseLink = document.querySelector("#cse");
const wddLink = document.querySelector("#wdd");

allLink.addEventListener("click", () => {
    createCourseCard(courses);
    CreateCourseCredits(courses)
})

cseLink.addEventListener("click", () => {
    const cseCourses = courses.filter(t => {
        return t.subject == "CSE"
    })

    createCourseCard(cseCourses);
    CreateCourseCredits(cseCourses);
})

wddLink.addEventListener("click", () => {
    const cseCourses = courses.filter(t => {
        return t.subject == "WDD"
    })

    createCourseCard(cseCourses);
    CreateCourseCredits(cseCourses);
})


function createCourseCard(courses) {
    const grid = document.querySelector(".course-grid");
    grid.innerHTML = "";

    courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";

        const title = document.createElement("button");
        title.className = "title";
        title.type = 'button'
        title.textContent = `✓ ${course.subject} ${course.number}`; // always include leading glyph
        title.addEventListener('click', () => displayCourseDetails(course));

        card.appendChild(title);

        if (course.completed) {
            card.classList.add("completed");
        } else {
            card.classList.remove("completed");
        }

        grid.appendChild(card);
    });
}


function CreateCourseCredits(courses) {
    const container = document.querySelector(".credits");
    container.innerHTML ="";

    let creditTotal = 0;
    courses.forEach(course => {
        if (course) {
        creditTotal += course.credits;
        }       
    });

        const card = document.createElement("div");
        card.className = "credit-card";

        const creditCard = document.createElement("div");
        creditCard.textContent = `The total credits for courses listed above is ${creditTotal}`;
        card.appendChild(creditCard);
       
        container.appendChild(card)
}

function displayCourseDetails(course) {
    // Build inner HTML for dialog
    courseDetails.innerHTML = `
    <button id="closeModal" aria-label="Close">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${escapeHtml(course.title)}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${escapeHtml(course.certificate)}</p>
    <p>${escapeHtml(course.description)}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;

    // Show as modal (browser <dialog> API)
   
        courseDetails.showModal();
   
    // Close button handler
    const closeBtn = courseDetails.querySelector('#closeModal');
    closeBtn.addEventListener('click', () => {
        if (typeof courseDetails.close === 'function') courseDetails.close();
        else courseDetails.classList.remove('open');
    });

    // Close when clicking on the backdrop: listen for cancel or click outside
    // The 'cancel' event fires when user presses Esc in many browsers
    const onCancel = (ev) => {
        // Remove listeners to avoid duplicates
        courseDetails.removeEventListener('cancel', onCancel);
        if (typeof courseDetails.close === 'function') courseDetails.close();
        else courseDetails.classList.remove('open');
    };
    courseDetails.addEventListener('cancel', onCancel);

    // Click outside to close (works as fallback): if click target is the dialog itself (backdrop)
    const onClick = (ev) => {
        if (ev.target === courseDetails) {
            if (typeof courseDetails.close === 'function') courseDetails.close();
            else courseDetails.classList.remove('open');
            courseDetails.removeEventListener('click', onClick);
        }
    };
    courseDetails.addEventListener('click', onClick);
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
