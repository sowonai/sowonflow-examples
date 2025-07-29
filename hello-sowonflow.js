import { Workflow, createConfig } from '@sowonai/sowonflow';
import 'dotenv/config';

// 🚀 The simplest SowonFlow Hello World example
async function helloSowonFlow() {
  console.log('👋 Hello SowonFlow!');
  console.log('='.repeat(50));

  try {
    // 1. Check environment variables
    console.log('🔧 Environment variables check:');
    console.log(`   SOWONFLOW_API_KEY: ${process.env.SOWONFLOW_API_KEY ? '✅ Set' : '❌ Not set'}`);
    console.log(`   SOWONFLOW_SPACE_ID: ${process.env.SOWONFLOW_SPACE_ID ? '✅ Set' : '❌ Not set'}`);
    
    if (!process.env.SOWONFLOW_API_KEY || !process.env.SOWONFLOW_SPACE_ID) {
      console.log('\n⚠️  Environment variables are not set.');
      console.log('   Please create .env file and enter API keys:');
      console.log('   cp .env.example .env');
      console.log('   Then enter the actual key values in the .env file.\n');
    }

    // 2. Create configuration (from environment variables)
    const config = createConfig({
      apiKey: process.env.SOWONFLOW_API_KEY || 'your-api-key',
      spaceId: process.env.SOWONFLOW_SPACE_ID || 'your-space-id'
    });

    // 3. Define simple YAML workflow
    const yamlWorkflow = `
version: "agentflow/v1"
kind: "WorkflowSpec"
metadata:
  name: "Hello SowonFlow"
  description: "The simplest SowonFlow example"

agents:
  - id: "hello_assistant"
    inline:
      type: "agent"
      model: "openai/gpt-4.1-mini"
      system_prompt: |
        You are a friendly and helpful AI assistant.
        Please answer simply and clearly.

        <information>
        SowonFlow - The Missing Link in AI Transformation
        ## What is SowonFlow?
        SowonFlow is an innovative YAML-based AI workflow engine that bridges the gap between business requirements and AI implementation. We solve a critical missing link in enterprise AI adoption – the disconnect between business teams who understand the problem and technical teams who implement the solution.

        ## Problems We Solve
        Enterprise AI adoption faces significant bottlenecks:
          - Business teams know the workflows but cannot implement AI solutions.
          - Technical teams can build AI systems but lack deep domain knowledge.
          - Existing solutions require extensive coding or expensive experts.
          - Complex workflows take months to develop and maintain.
          - Most companies struggle with AI transformation despite having clear use cases and budgets.
        </information>

nodes:
  start:
    type: "agent_task"
    agent: "hello_assistant"
    next: "end"

  end:
    type: "end"
`;

    // 4. Create workflow instance
    const workflow = new Workflow({
      mainWorkflow: yamlWorkflow,
      config: config
    });

    // 5. Test with a simple question
    console.log('💬 Question: "Hello! Please briefly introduce SowonFlow."');
    console.log('🤖 Answer:');
    
    const result = await workflow.ask("Hello! Please briefly introduce SowonFlow.");
    console.log(result.content);

    console.log('\n' + '='.repeat(50));
    console.log('✅ Hello SowonFlow example completed!');

  } catch (error) {
    console.error('❌ Error occurred:', error.message);
    console.log('\n📝 Troubleshooting guide:');
    
    if (error.message.includes('Connection error') || error.message.includes('ECONNREFUSED')) {
      console.log('🔌 Connection error occurred.');
      console.log('   - Check if SowonFlow server is running');
      console.log('   - Verify API endpoint is correct');
      console.log('   - Check network connection');
    } else if (!process.env.SOWONFLOW_API_KEY || !process.env.SOWONFLOW_SPACE_ID) {
      console.log('🔑 Environment variable setup required:');
      console.log('   - Create .env file: cp .env.example .env');
      console.log('   - Enter correct API keys in .env file');
    } else {
      console.log('🔍 General solutions:');
      console.log('   - Check if API key is valid');
      console.log('   - Verify Space ID is correct');
      console.log('   - Refer to SowonFlow documentation: https://sowonai.github.io/sowonflow-docs/');
    }
  }
}

// Call hello function when script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  helloSowonFlow();
}
