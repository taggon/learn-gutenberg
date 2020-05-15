import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import prompts from 'prompts';
import globby from 'globby';

(async () => {
    const lessons = await globby([ 'lessons/*/README.md' ]);
    const response = await prompts({
        type: 'select',
        name: 'lesson',
        message: 'What do you want to learn?',
        choices: lessons.map((lessonPath) => {
            const dir = path.dirname(lessonPath);
            const content = String(fs.readFileSync(lessonPath));
            const match = content.match(/^# ([^\n\r]+)/m);

            return {
                title: match?.[1] || path.basename(lessonPath),
                value: dir,
            } as prompts.Choice;
        })
    });

    console.log('\nYay! Here we go. 🏃‍♀️🏃🏿‍♀️🏃‍♂️🏃🏽‍♀️🏃🏾🏃🏻‍♂️\n');

    const parcel = spawn('npx', ['parcel', `${response.lesson}/index.html`]);
    parcel.stdout.pipe(process.stdout);
    parcel.stderr.pipe(process.stderr);
})();