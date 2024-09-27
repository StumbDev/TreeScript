function parse(code) {
    const lines = code.split('\n');
    const ast = [];

    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('//')) continue; // Skip comments

        // Match function definitions
        const funcMatch = line.match(/^\(\?func (\w+) => \{(.*)\}\)$/);
        if (funcMatch) {
            ast.push({
                type: 'Function',
                name: funcMatch[1],
                body: funcMatch[2]
            });
            continue;
        }

        // Match write statements
        const writeMatch = line.match(/^\(write\(runVar\("(.+)"\)\)\)$/);
        if (writeMatch) {
            ast.push({
                type: 'Write',
                value: writeMatch[1]
            });
            continue;
        }

        // Match if statements
        const ifMatch = line.match(/^\(\?if\((.+)\) \{(.*)\}\)$/);
        if (ifMatch) {
            ast.push({
                type: 'If',
                condition: ifMatch[1],
                body: ifMatch[2]
            });
            continue;
        }

        // Match export statements
        const exportMatch = line.match(/^\(Run\.Export\(Done\(\?(\w+)\)\)\)$/);
        if (exportMatch) {
            ast.push({
                type: 'Export',
                functionName: exportMatch[1]
            });
            continue;
        }

        // Match return statements
        const returnMatch = line.match(/^\?return\(run\?:\?(\w+)\):end$/);
        if (returnMatch) {
            ast.push({
                type: 'Return',
                functionName: returnMatch[1]
            });
        }
    }

    return ast;
}