import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Search } from 'lucide-react';

export function CommandHistorySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if(query.trim().length>0){
        // console.log('Debounced search:', query);  // Log to verify
        const mockResults = [
          { shell: 'Bash', command: `grep "${query}" ~/.bash_history` },
          { shell: 'Zsh', command: `grep "${query}" ~/.zsh_history` },
          { shell: 'PowerShell', command: `Get-Content (Get-PSReadlineOption).HistorySavePath | Select-String "${query}"` },
        ];
        setSearchResults(mockResults);
      }
      
    }, 350),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="container mx-auto p-2 max-w-3xl">
      <div className="fixed top-[-25vw] right-[10vw]  w-[100vw] md:w-[100vw] h-[50vh] md:h-[35vw] rotate-[15deg] rounded-[100px] z-0 bg-[#5a2af1] opacity-10"></div>

      <h1 className="text-3xl font-bold mb-6">cmds find ctrl+b</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search command history..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full rounded-lg border px-4 py-2 text-sm text-black  border-neutral-700 bg-transparent text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500"
          />
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What To Search</h2>
        {searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((result, index) => (
              <li key={index} className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="font-semibold">{result.shell}</h3>
                <code className="text-sm bg-neutral-800 mt-1 p-1 rounded">{result.command}</code>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No results found. Start typing to search.</p>
        )}
      </div>
      <div className="mb-8">
<div className='flex flex-row items-center justify-between'>
<h2 className="text-2xl font-semibold mb-4">Tool Script</h2>
<div className='flex-row flex gap-2 items-center'>
<div className="w-3 border border-white/10 h-3 rounded-full bg-[#3572A5]"
></div>
<p className="text-xs md:text-sm  text-[#3572A5]" >Python</p>
</div>
</div>
        <div className="relative w-full bg-neutral-900 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute h-6 w-6 -left-3 -bottom-3 dark:text-white text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute h-6 w-6 -right-3 -bottom-3 dark:text-white text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
            </svg>
          <pre className="p-4 relative mx-auto w-full text-sm max-w-full overflow-x-auto">
            <code>{`
import os
import re
import readline
from typing import List, Dict

def search_history(query: str) -> Dict[str, List[str]]:
    results = {}
    
    # Bash history
    bash_history = os.path.expanduser('~/.bash_history')
    if os.path.exists(bash_history):
        with open(bash_history, 'r') as f:
            bash_results = [line.strip() for line in f if query.lower() in line.lower()]
        results['Bash'] = bash_results

    # Zsh history
    zsh_history = os.path.expanduser('~/.zsh_history')
    if os.path.exists(zsh_history):
        with open(zsh_history, 'r') as f:
            zsh_results = [line.strip().split(';')[-1] for line in f if query.lower() in line.lower()]
        results['Zsh'] = zsh_results

    # PowerShell history
    powershell_history = os.path.expanduser('~/.local/share/powershell/PSReadLine/ConsoleHost_history.txt')
    if os.path.exists(powershell_history):
        with open(powershell_history, 'r') as f:
            ps_results = [line.strip() for line in f if query.lower() in line.lower()]
        results['PowerShell'] = ps_results

    return results

def main():
    print("Command History Search")
    print("Type your search query (Ctrl+C to exit):")
    
    while True:
        try:
            query = input("> ")
            results = search_history(query)
            
            for shell, commands in results.items():
                print(f"\n{shell} results:")
                for cmd in commands[:5]:  # Limit to 5 results per shell
                    print(f"  {cmd}")
            
            print("\nPress Enter to search again or Ctrl+C to exit.")
            input()
        except KeyboardInterrupt:
            print("\nExiting...")
            break

if __name__ == "__main__":
    main()
            `}</code>
          </pre>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          This Python script searches through command history files for Bash, Zsh, and PowerShell. 
          It provides real-time search results as you type, with debouncing to minimize excessive searches.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>The script searches in common locations for history files of each shell.</li>
          <li>It performs a case-insensitive search for the given query in each history file.</li>
          <li>Results are grouped by shell and limited to 5 results per shell to avoid overwhelming output.</li>
          <li>The script runs in a loop, allowing for multiple searches in one session.</li>
        </ul>
      </div>
    </div>
  );
}
export default CommandHistorySearch;
