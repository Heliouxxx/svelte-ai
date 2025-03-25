import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
    const ollama = new Ollama({ host: "http://localhost:11434" });

    const body = await request.json();
    const chatMessage = body.chat || "";

    const user = {
        usertype: "Master User",
        school_id: "202211530",
        fullname: "Anthony Alfred P. Almenario",
        firstname: "Anthony Alfred",
        middlename: "Paradero",
        surname: "Almenario",
        email: "202211530@gordoncollege.edu.ph",
        phone: "09620775309",
        birthday: "2003-10-27",
        age: 22,
        gender: "Male",
        nationality: "Filipino",
        address: {
            house_number: "#17",
            street: "Rizal Avenue",
            barangay: "West Tapinac",
            city: "Olongapo City",
            state: "Zambales",
            zip_code: "2200"
        },
        hobbies: ["running", "playing mobile legends, cyberpunk 2077", "watching movies and series", "reading mystery novels"],
        academic_info: {
            course: "BSCS - Computer Science",
            year_level: "3rd Year",
            school: "Gordon College"
        },
        skills: {
            technical: ["Machine Learning", "Programming", "Data Analysis"],
            soft_skills: ["Problem-Solving", "Teamwork", "Critical Thinking"]
        },
        things_i_like: ["caramel", "chicken","things that normally people do not want" , "tofu", "mysterious things"],
        favorite_movies: ["perfect blue"],
        favorite_games: ["cyberpunk 2077", "mobile legends"],
        
        emergency_contact: {
            name: "Elmer C. Almenario",
            relationship: "Mother",
            phone: "09062061444"
        },
        mother: {
            name: "Annaliza P. Almenario",
            relationship: "Mother",
            about: "deceased"
        },
        father: {
            name: "Elmer C. Almenario",
            relationship: "Father",
            phone: "0906206444"
        },
        sister: {
            name: "Patricia Leann P. Almenario",
            relationship: "sister",
            phone: "09070971509"
        },
        blood_type: "O+",
        medical_conditions: "None",
        status: "single and not ready to mingle",
    };

    const chat = await ollama.chat({
        model: "deepseek-r1:7b",
        messages: [
            {
                role: "system",
                content: `Here is the data of my user: ${JSON.stringify(user)}
                Respond only based on the data provided.`
            },
            {
                role: "user",
                content: chatMessage,
            },
        ],
    });

    return json(chat);
};