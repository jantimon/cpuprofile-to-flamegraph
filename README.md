# cpuprofile-to-flamegraph

Convert a `.cpuprofile` into a flameGraph tree to be renderable with [D3-FlameGraph](https://github.com/spiermar/d3-flame-graph).

![Flame Graph Example](https://github.com/jantimon/cpuprofile-to-flamegraph/raw/master/flamegraph.gif "Flame Graph Example")

```
/**
 * Compatible to the D3-FlameGraph input format
 * https://github.com/spiermar/d3-flame-graph#input-format
 */
type FlameGraphNode FlameGraphNode = {
	/**
	 * JavaScript function name.
	 */
	name: string;
	/**
	 * Self execution time
	 */
	value: number;
	/**
	 * Execution time including child nodes
	 */
	executionTime: number;
	/**
	 * Child nodes
	 */
	children: Array<FlameGraphNode>;
	/**
	 * Original cpu profiler node
	 */
	profileNode: {
        /**
        * Unique id of the node.
        */
        id: number;
        /**
        * Runtime.CallFrame
        * Function location
        */
        callFrame: {
            /**
            * JavaScript function name.
            */
            functionName?: string;
            /**
            * JavaScript script id.
            */
            scriptId: string;
            /**
            * JavaScript script name or url.
            */
            url: string;
            /**
            * JavaScript script line number (0-based).
            */
            lineNumber: number;
            /**
            * JavaScript script column number (0-based).
            */
            columnNumber: number;
        };
        /**
        * Number of samples where this node was on top of the call stack.
        */
        hitCount?: number;
        /**
        * Child node ids.
        */
        children?: number[];
    };
	/**
	 * nodeModule name if known
	 */
	nodeModule?: string;
	/**
	 * Parent node
	 */
	parent?: FlameGraphNode;
};
```

## Usage:

`cpuprofile-to-flamegraph` is only able to transform a profile into a renderable structure.  
To render it you have to combine it with [D3-FlameGraph](https://github.com/spiermar/d3-flame-graph).

It will also calculate the execution timings and sort all nodes chronologically.

```
import { convertToMergedFlameGraph } from "cpuprofile-to-flamegraph";

const profile = JSON.parse(fs.readFileSync('demo.cpuprofile', "utf-8"));
const flameGraph = convertToMergedFlameGraph(profile);
```
