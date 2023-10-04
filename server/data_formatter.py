from abc import ABC, abstractmethod
from server.model import Secret
from dicttoxml import dicttoxml


class DataFormatter(ABC):
    @abstractmethod
    def format_data(self, secret:Secret):
        pass


class JsonFormatter(DataFormatter):
    def format_data(self, secret: Secret) ->dict:
        return secret.to_dict()


class XmlFormatter(DataFormatter):
    def format_data(self, secret: Secret) ->str:
        secret_dict = secret.to_dict()
        return dicttoxml(secret_dict)
    

FORMATTING_OPTIONS:dict[str, DataFormatter] = {
    "application/json": JsonFormatter(),
    "application/xml": XmlFormatter(),
}