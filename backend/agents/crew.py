from crewai import Agent, Task, Crew, Process, LLM
from crewai.project import CrewBase, agent, crew, task, after_kickoff
from crewai_tools import SerperDevTool
from dotenv import load_dotenv

load_dotenv()

gemini_llm = LLM(
    model="gemini/gemini-2.0-flash",
    temperature=0.7,
)

search_tool = SerperDevTool()

@CrewBase
class SalesCrew():
    """Sales Prospect Crew"""

    agents_config = "config/agents.yaml"
    tasks_config = "config/tasks.yaml"

    @after_kickoff
    def process_output(self, output):
        # Modify output after the crew finishes
        output.raw += "\nProcessed after kickoff."
        return output

    @agent
    def pesquisador(self) -> Agent:
        return Agent(
            config=self.agents_config['pesquisador'],
            # verbose=True,
            llm=gemini_llm,
            tools=[search_tool],
            # max_rpm=5
        )
    
    @agent
    def analista(self) -> Agent:
        return Agent(
            config=self.agents_config['analista'],
            # verbose=True,
            llm=gemini_llm,
            memory=True,
        )
    
    @agent
    def copywriter(self) -> Agent:
        return Agent(
            config=self.agents_config['copywriter'],
            # verbose=True,
            llm=gemini_llm
        )
    
    @agent
    def consolidador(self) -> Agent:
        return Agent(
            config=self.agents_config['consolidador'],
            llm=gemini_llm
        )
    
    @task
    def pesquisa_empresa(self) -> Task:
        return Task(
            config=self.tasks_config['pesquisa_empresa']
        )
    
    @task
    def analise_mercado(self) -> Task:
        return Task(
            config=self.tasks_config['analise_mercado']
        )
    
    @task
    def criar_mensagem_prospeccao(self) -> Task:
        return Task(
            config=self.tasks_config['criar_mensagem_prospeccao']
        )
    
    @task
    def consolidar_resultado(self) -> Task:
        return Task(
            config=self.tasks_config['consolidar_resultado']
        )
    
    @crew
    def crew(self) -> Crew:
        return Crew(
            # verbose=True,
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential
        )

sales_crew = SalesCrew().crew()

def run_sales_crew(crew, new_inputs) -> str:
    return crew.kickoff(inputs=new_inputs)

# print(run_sales_crew(sales_crew, new_inputs={"company_name":"Nome empresa","website":"site empresa"}))