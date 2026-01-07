# Document File

Add documentation comments to the specified file following the project documentation guidelines.

## Instructions

1. Read the documentation guidelines from `docs/documentation.md`
2. Read the file at: {{#if ARGUMENTS}}$ARGUMENTS{{else}}$CURRENT_FILE{{/if}}
3. Add documentation comments following these rules:
   - Add JSDoc/Javadoc comments ONLY for functions, methods, classes, interfaces, types, and enums
   - Place all comments directly ABOVE the element being documented
   - Do NOT add any comments inside function bodies
   - Do NOT document self-explanatory getters/setters
   - Include parameter descriptions when not self-evident
   - Include return value descriptions when not self-evident

## Output

Document the file and show a summary of what was documented.
