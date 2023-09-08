import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';


export const parseCsvToArray = function (filePath) {
    const records = parse(fs.readFileSync(path.join(__dirname, filePath)), {
        columns: false,
        skip_empty_lines: true,
        relax_column_count: true
    });

    return records.flat();
};