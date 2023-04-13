// Problem 1
const sam = {
firstName: "Sam",
department: "Tech",
designation: "Manager",
salary: 40000,
raiseEligible: true,
};

console.log(sam)


const mary = {
firstName: "Mary",
department: "Finance",
designation: "Trainee",
salary: 18500,
raiseEligible: true,
};

console.log(mary)

const bill = {
firstName: "Bill",
department: "HR",
designation: "Executive",
salary: 21200,
raiseEligible: false,
};

console.log(bill)

// Problem 2
const employees = [sam, mary, bill];

console.log(employees)

const techStars = {
companyName: "Tech Stars",
website: "www.techstars.site",
employees: employees,
};

console.log(techStars)

// Problem 3
const anna = {
firstName: "Anna",
department: "Tech",
designation: "Executive",
salary: 25600,
raiseEligible: false,
};

techStars.employees.push(anna);

console.log(anna);

// Problem 4
let totalSalary = 0;
techStars.employees.forEach((employee) => {
totalSalary += employee.salary;
});
console.log(totalSalary);

// Problem 5
function giveRaises(company) {
company.employees.forEach((employee) => {
if (employee.raiseEligible) {
employee.salary *= 1.1;
employee.raiseEligible = false;
}
});
}

giveRaises(techStars);
console.log(techStars);

// Problem 6
const workingFromHome = ["Anna", "Sam"];

techStars.employees.forEach((employee) => {
if (workingFromHome.includes(employee.firstName)) {
employee.wfh = true;
} else {
employee.wfh = false;
}
});

console.log(workingFromHome);