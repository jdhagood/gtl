import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, Check, X, Loader2 } from 'lucide-react';

const CodeChallenge = ({ 
  title = "Example Challenge",
  description = "Write a function that adds two numbers",
  startingCode = "def add_numbers(a, b):\n    # Your code here\n    pass",
  testCases = [
    { input: [1, 2], expected: 3 },
    { input: [0, 0], expected: 0 },
    { input: [-1, 1], expected: 0 },
  ]
}) => {
  const [code, setCode] = useState(startingCode);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Pyodide
    const loadPyodide = async () => {
      try {
        const pyodideModule = await import("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");
        const pyodideInstance = await pyodideModule.loadPyodide();
        setPyodide(pyodideInstance);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load Python environment: " + err.message);
        setIsLoading(false);
      }
    };

    loadPyodide();
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    setError(null);
    setResults([]);
    
    try {
      // Create a new namespace for this execution
      await pyodide.runPython('import sys');
      const globals = pyodide.globals.get('dict')();

      // Run the user's code
      await pyodide.runPython(code, { globals });

      // Get the function name
      const functionMatch = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
      if (!functionMatch) {
        throw new Error("No function definition found");
      }
      const functionName = functionMatch[1];

      // Run test cases
      const results = [];
      for (const testCase of testCases) {
        try {
          const inputArgs = testCase.input.map(arg => 
            typeof arg === 'string' ? `'${arg}'` : arg
          ).join(', ');
          
          const result = await pyodide.runPython(
            `${functionName}(${inputArgs})`,
            { globals }
          );

          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            passed: result === testCase.expected,
            error: null
          });
        } catch (err) {
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            passed: false,
            error: err.message
          });
        }
      }
      
      setResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading Python environment...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
        
        <div className="mb-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border rounded-md"
            spellCheck="false"
          />
        </div>
        
        <div className="mb-4">
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {isRunning ? 'Running...' : 'Run Tests'}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription className="whitespace-pre-wrap font-mono">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {results.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Test Results</h3>
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-4 rounded-md ${
                  result.passed 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.passed 
                    ? <Check className="w-5 h-5 text-green-600" />
                    : <X className="w-5 h-5 text-red-600" />
                  }
                  <span className="font-medium">
                    Test Case {index + 1}
                  </span>
                </div>
                <div className="mt-2 text-sm font-mono">
                  <div>Input: {JSON.stringify(result.input)}</div>
                  <div>Expected: {JSON.stringify(result.expected)}</div>
                  <div>Actual: {JSON.stringify(result.actual)}</div>
                  {result.error && (
                    <div className="text-red-600">Error: {result.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeChallenge;