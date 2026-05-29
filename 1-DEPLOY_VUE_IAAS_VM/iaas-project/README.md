

# 😜 PASSOS PARA O DEPLOY EM VM (IAAS):


## 1 - Fazer login na azure:

```bash
az login --use-device-code
```

## 2 - Criar variáveis para ajudar nos comandos (opcional):
```bash
$RG="andre-savedra-rg"
$VM="andre-savedra-vm"
$LOC="eastus"
```

## 3 - Criar um resource group:
```bash
az group create --name $RG --location $LOC
```


## 4 - Criar uma virtual machine:
```bash
az vm create --resource-group $RG --name $VM --image "Ubuntu2204" --size "Standard_B1s" --admin-username "andre-savedra" --generate-ssh-keys
```

## 5 - Pegar o IP público da sua vm:
```bash
20.127.113.182
```

## 6 - Liberar a porta 80 (http) da vm:
```bash
az vm open-port --resource-group $RG --name $VM --port 80
```

## 7 - Instalar o nginx na VM via bastion ou ssh(fora do senai):
```bash
sudo apt-get install nginx
```


## 8 - clonar o projeto dentro da sua vm (pode ser apenas o dist): 
```bash
git clone URL_DO_REPO
```

## 9 - copiar a pasta dist para a pasta do nginx: 
```bash
sudo mv ./CAMINHO_DA_SUA_DIST/dist/* /var/www/html/
```


## 10 - dar restart no servidor nginx: 
```bash
sudo systemctl restart nginx
```


## 11 - 👏 acesse o IP público e seu deploy está pronto!
```bash
20.127.113.182
```
