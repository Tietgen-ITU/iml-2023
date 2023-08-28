import {asyncRun} from "./py-worker.js";

const script = `
    import statistics
    from js import A_rank
    statistics.stdev(A_rank)
`;

const context = {
    A_rank: [0.8, 0.4, 1.2, 3.7, 2.6, 5.8],
};

export async function run_cell(source, out) {
    console.log("Running")
    let out_elem = document.getElementById(out);

    const {results, error, output} = await asyncRun(source, {});
    console.log(results);

    if (error) {
        console.log("pyodideWorker error: ", error);
    } else {
        console.log(results);
        out_elem.innerHTML = output;
        if (results) {
           out_elem.innerHTML += "\n" + results.toString();
        }
    }


}

async function main() {
    try {
        const {results, error, output} = await asyncRun(script, context);
        if (results) {
            console.log("pyodideWorker return results: ", results);
        } else if (error) {
            console.log("pyodideWorker error: ", error);
        }
    } catch (e) {
        console.log(
            `Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`,
        );
    }
}

console.log("hej");
main();