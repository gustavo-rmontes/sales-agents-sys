import pytest
from dataclasses import dataclass

from agents.crew import sales_crew, run_sales_crew

@dataclass
class CrewTestInput(): # classe para os testes da Crew de vendas
    company_name: str
    website: str
    
    def to_inputs_format(self) -> dict:
        return {
            "company_name": self.company_name,
            "website": self.website
        }

llm_answers_mock = {

}

@pytest.mark.parametrize("mocks", [
    # CrewTestInput("Sales Impact", "https://salesimpact.com.br/"),
    CrewTestInput("Google", "https://google.com/")
])
def test_run_sales_crew(mocks):
    result = run_sales_crew(crew=sales_crew, company=mocks.to_inputs_format())

    assert result is not None

    # assert 
