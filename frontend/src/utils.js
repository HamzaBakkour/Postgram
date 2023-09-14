//src/utils.js
export const randomAvatar = () => 
    `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 60) + 1 }`;


export const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));