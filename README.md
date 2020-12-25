# ARC Client

## Информация

Клиент для [центрального сервера allure](https://github.com/samurayii/allure-report-center).

## Оглавление

- [Установка](#install)
- [Команды/Ключи запуска](#launch)

## <a name="install"></a> Установка и использование

пример установки: `npm install arc-client -g`

вызов справки: `arc-client -h`

пример запуска: `arc-client projects delete -pn project-dev -u http://allure-report-server:3001 --logs debug`

## <a name="launch"></a> Таблица команд/ключей запуска

Команда/Ключ | Переменная среды | Описание
------------ | ------------- | -------------
projects | | работа с проектами на сервере
reports | | работа с отчётами на сервере
list | | посмотреть содержимое, используются с командами **projects** и **reports**
exist | | проверка наличия на сервере, используются с командами **projects** и **reports**
delete | | удалить объект на сервере, используются с командами **projects** и **reports**
get | | получить отчёт с сервера, используются с командой **reports**
harvest | | загрузить недостающие отчёты на сервер, используются с командой **reports**
send | | отправить отчёт на сервер, используются с командой **reports**
--version, -v | | вывести номер версии приложения
--help, -h | | вызвать справку по ключам запуска
-u, --url | ARC_CLIENT_URL | ссылка на сервер конфигурации (пример: http://allure-report-server:3001)
-pn, --project_name | ARC_CLIENT_PROJECT_NAME | имя проекта
-rn, --report_name | ARC_CLIENT_REPORT_NAME | имя отчёта
-rp, --report_path | ARC_CLIENT_REPORT_PATH | путь к отчёту
-fp, --folder_path | ARC_CLIENT_FOLDER_PATH | папка с отчётами
-o, --output | ARC_CLIENT_FOLDER_PATH | путь к файлу результат скачивания отчёта
-l, --logs | ARC_CLIENT_LOGS | уровень логов **none**, **prod**, **dev** или **debug** (по умолчанию prod)