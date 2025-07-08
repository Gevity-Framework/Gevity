# Gevity

A powerful framework for creating and integrating AI agents with persistent long-term memory capabilities, enabling more efficient execution of complex multi-step tasks.

## About

Gevity is a comprehensive framework designed to revolutionize how developers work with AI agents by providing robust long-term memory capabilities. Unlike traditional agent frameworks that rely solely on context windows and recent interactions, Gevity enables agents to maintain persistent memory across sessions, conversations, and tasks.

### Why Gevity?

Traditional AI agents face significant limitations when handling complex, multi-step tasks that span extended periods. They often lose context, repeat completed work, or fail to build upon previous interactions. Gevity solves these challenges by:

- **Persistent Memory**: Agents retain information across sessions and conversations
- **Context Continuity**: Seamless task resumption and progress tracking
- **Efficient Task Management**: Reduced redundancy and improved task completion rates
- **Scalable Architecture**: Built to handle complex workflows and multiple concurrent agents

### Use Cases

- **Personal Assistants**: Agents that remember user preferences, past conversations, and ongoing projects
- **Research Assistants**: Maintain research context across multiple sessions and sources
- **Project Management**: Track progress, decisions, and blockers across long-term projects
- **Customer Support**: Provide consistent service with full interaction history
- **Content Creation**: Build upon previous work and maintain creative consistency

## Key Features

- 🧠 **Persistent Long-term Memory**: Agents remember across sessions and conversations
- 🔄 **Task Continuity**: Resume complex multi-step processes seamlessly
- 📊 **Memory Analytics**: Insights into agent memory usage and patterns
- 🛠️ **Flexible Integration**: Easy integration with existing AI frameworks
- 🔒 **Secure Storage**: Encrypted memory storage with configurable backends
- 🎯 **Context-Aware Retrieval**: Intelligent memory retrieval based on relevance
- 📈 **Performance Optimization**: Efficient memory management and retrieval
- 🔧 **Extensible Architecture**: Plugin system for custom memory backends

## Installation

### Requirements

- Python 3.8 or higher
- pip package manager

### Install from PyPI

```bash
pip install gevity
```

### Install from Source

```bash
git clone https://github.com/gevity-framework/gevity.git
cd gevity
pip install -e .
```

### Optional Dependencies

For enhanced functionality, install optional dependencies:

```bash
# For vector database support
pip install gevity[vector]

# For cloud storage backends
pip install gevity[cloud]

# For development tools
pip install gevity[dev]

# Install all optional dependencies
pip install gevity[all]
```

## Quick Start

Here's a simple example to get you started with Gevity:

```python
from gevity import Agent, MemoryBackend

# Initialize memory backend
memory = MemoryBackend(backend_type="sqlite", database_path="agent_memory.db")

# Create an agent with long-term memory
agent = Agent(
    name="my_assistant",
    memory_backend=memory,
    llm_config={
        "model": "gpt-4",
        "api_key": "your-api-key"
    }
)

# Agent will remember this conversation
response = agent.chat("I'm working on a Python project about data analysis")
print(response)

# Later, in a new session...
agent = Agent.load("my_assistant", memory_backend=memory)
response = agent.chat("Can you help me continue with my Python project?")
# Agent remembers the previous context about data analysis
print(response)
```

## Usage Examples

### Basic Agent with Memory

```python
from gevity import Agent, MemoryBackend

# Create memory backend
memory = MemoryBackend(backend_type="postgresql", connection_string="your-db-url")

# Initialize agent
agent = Agent(
    name="research_assistant",
    memory_backend=memory,
    system_prompt="You are a helpful research assistant with excellent memory.",
    llm_config={
        "model": "gpt-4",
        "temperature": 0.7
    }
)

# Multi-turn conversation with memory
conversation = [
    "I'm researching renewable energy sources",
    "Focus on solar panel efficiency improvements",
    "What were the key findings from last week's research?"
]

for message in conversation:
    response = agent.chat(message)
    print(f"User: {message}")
    print(f"Agent: {response}\n")
```

### Task Management with Memory

```python
from gevity import Agent, Task, MemoryBackend

memory = MemoryBackend(backend_type="redis", host="localhost", port=6379)
agent = Agent("project_manager", memory_backend=memory)

# Create a complex task
task = Task(
    name="website_redesign",
    description="Redesign company website with modern UI",
    steps=[
        "Research current design trends",
        "Create wireframes",
        "Develop prototype",
        "Get stakeholder feedback",
        "Implement changes"
    ]
)

# Agent tracks progress across sessions
agent.start_task(task)
agent.update_task_progress("website_redesign", step=0, status="completed")
agent.add_task_note("website_redesign", "Found great inspiration from minimalist designs")

# Later session - agent remembers all progress
progress = agent.get_task_progress("website_redesign")
print(f"Current progress: {progress}")
```

### Memory Search and Retrieval

```python
from gevity import Agent, MemoryBackend

agent = Agent("knowledge_worker", memory_backend=MemoryBackend("vector"))

# Store various types of information
agent.store_memory("meeting", "Discussed Q4 budget planning with finance team")
agent.store_memory("idea", "Use ML to optimize supply chain logistics")
agent.store_memory("contact", "John Smith - CTO at TechCorp, expert in AI")

# Search memories by relevance
budget_memories = agent.search_memories("budget planning", limit=5)
tech_contacts = agent.search_memories("AI expert", memory_type="contact")

# Use retrieved memories in conversation
response = agent.chat("What did we discuss about the budget?")
```

### Multi-Agent Collaboration

```python
from gevity import Agent, SharedMemoryBackend

# Shared memory for agent collaboration
shared_memory = SharedMemoryBackend("collaborative_workspace")

# Create specialized agents
researcher = Agent("researcher", memory_backend=shared_memory)
writer = Agent("writer", memory_backend=shared_memory)
editor = Agent("editor", memory_backend=shared_memory)

# Collaborative workflow
research_findings = researcher.research("AI trends 2024")
draft_article = writer.write_article(research_findings)
final_article = editor.edit_article(draft_article)

# All agents can access shared context
print(researcher.get_shared_context("current_project"))
```

## API Reference

### Agent Class

```python
class Agent:
    def __init__(self, name: str, memory_backend: MemoryBackend, **kwargs):
        """Initialize agent with memory backend."""
        
    def chat(self, message: str) -> str:
        """Send message to agent and get response."""
        
    def store_memory(self, memory_type: str, content: str, metadata: dict = None):
        """Store information in long-term memory."""
        
    def search_memories(self, query: str, limit: int = 10) -> List[Memory]:
        """Search memories by relevance."""
        
    def get_memory_summary(self, days: int = 7) -> str:
        """Get summary of recent memories."""
```

### MemoryBackend Class

```python
class MemoryBackend:
    def __init__(self, backend_type: str, **config):
        """Initialize memory backend."""
        
    def store(self, agent_id: str, memory: Memory):
        """Store memory for agent."""
        
    def retrieve(self, agent_id: str, query: str) -> List[Memory]:
        """Retrieve relevant memories."""
        
    def delete(self, agent_id: str, memory_id: str):
        """Delete specific memory."""
```

## Contributing

We welcome contributions to Gevity! Here's how you can help:

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/gevity-framework/gevity.git
   cd gevity
   ```

3. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install development dependencies**:
   ```bash
   pip install -e .[dev]
   ```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=gevity

# Run specific test file
pytest tests/test_memory.py
```

### Code Style

We use Black for code formatting and flake8 for linting:

```bash
# Format code
black gevity/

# Check linting
flake8 gevity/

# Type checking
mypy gevity/
```

### Contribution Guidelines

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes** with appropriate tests
3. **Run tests** and ensure they pass
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

### Areas for Contribution

- **Memory Backends**: Implement new storage backends (MongoDB, DynamoDB, etc.)
- **Agent Capabilities**: Add new agent types and capabilities
- **Performance**: Optimize memory retrieval and storage
- **Documentation**: Improve docs, examples, and tutorials
- **Testing**: Add more comprehensive tests
- **Tools**: Build debugging and monitoring tools

### Bug Reports

Please use the GitHub issue tracker to report bugs. Include:
- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- System information and versions

### Feature Requests

We'd love to hear your ideas! Submit feature requests via GitHub issues with:
- Clear description of the feature
- Use cases and benefits
- Potential implementation approach

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### Enterprise Support

For enterprise customers, we offer:
- Priority support and SLA
- Custom integration assistance
- Advanced security features
- Dedicated account management

---

**Gevity** - Empowering AI agents with persistent memory for better task execution.