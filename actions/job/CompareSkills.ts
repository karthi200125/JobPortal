interface SkillsCheckResult {
    per: number;
    Msg: string;
}

export const checkSkills = (user?: { skills: string[] }, job?: { skills: string[] }): SkillsCheckResult => {
    const userSkills = user?.skills || [];
    const jobSkills = job?.skills || [];

    if (jobSkills.length === 0) {
        return { per: 0, Msg: "No job skills provided to compare." };
    }

    // const matchedSkills = jobSkills.filter((skill) => userSkills.toLowerCase().includes(skill.toLowerCase()));
    const matchedSkills = jobSkills.filter((skill) =>
        userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
    const matchPercentage = (matchedSkills.length / jobSkills.length) * 100;

    let fitMsg = "Poor skill match, you need to improve your skills.";
    if (matchPercentage >= 70) {
        fitMsg = "Good skill match, you may be a great fit!";
    } else if (matchPercentage >= 31) {
        fitMsg = "Medium skill match, you have some relevant skills.";
    }

    return { per: matchPercentage, Msg: fitMsg };
};
