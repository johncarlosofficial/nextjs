const matchAnyEmojiWithSpaceAfter =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s+/;

const allowedCommitTypes =
    /^(feat|fix|docs|style|refactor|perf|test|chore|build|ci|revert|improvement|workflow)$/;

module.exports = {
    parserPreset: {
        parserOpts: {
            // Updated regex to allow for optional subject
            headerPattern: new RegExp(
                "^" +
                    matchAnyEmojiWithSpaceAfter.source +
                    "(?<type>\\w+)\\s*:\\s*(?<subject>.*)?$", // type should match word characters
            ),
            headerCorrespondence: ["emoji", "type", "subject"],
        },
    },
    plugins: [
        {
            rules: {
                "header-match-emoji-and-conventional": (parsed) => {
                    const { emoji, type, subject } = parsed;

                    // Check for missing emoji
                    if (!emoji) {
                        return [
                            false,
                            "Commit message must start with an emoji.",
                        ];
                    }

                    const errors = [];

                    // Check for missing type
                    if (!type) {
                        errors.push("Commit type cannot be empty.");
                    } else if (!allowedCommitTypes.test(type)) {
                        errors.push(
                            `Invalid commit type '${type}'. Please use one of the following: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert, improvement, workflow.`,
                        );
                    }

                    // Check for missing subject
                    if (!subject || subject.trim() === "") {
                        errors.push(
                            "Commit subject cannot be empty. Please provide a brief description of your changes.",
                        );
                    }

                    // If there are errors, return them
                    if (errors.length > 0) {
                        return [false, errors.join(" ")]; // Join errors for clear output
                    }

                    return [true, ""];
                },
            },
        },
    ],
    rules: {
        "header-match-emoji-and-conventional": [2, "always"],
        "type-empty": [2, "never", "Commit type cannot be empty."],
        // Disable built-in subject-empty rule since custom rule handles it
        "subject-empty": [0],
    },
};
