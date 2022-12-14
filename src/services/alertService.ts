import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
};

export enum AlertType {
    Success = 'Success',
    Error = 'Error',
    Info = 'Info',
    Warning = 'Warning'
}

export interface IAlert {
    id: string
    message: string
    type: AlertType
    fade: boolean
    autoClose: boolean
    keepAfterRouteChange?: boolean
}

const alertSubject = new Subject<Partial<IAlert>>();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id = defaultId): Observable<Partial<IAlert>> {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

// convenience methods
function success(message: string, options: any = {}) {
    alert({...options, type: AlertType.Success, message});
}

function error(message: string, options: any = {}) {
    alert({...options, type: AlertType.Error, message});
}

function info(message: string, options: any = {}) {
    alert({...options, type: AlertType.Info, message});
}

function warn(message: string, options: any = {}) {
    alert({...options, type: AlertType.Warning, message});
}

// core alert method
function alert(alert: IAlert) {
    alert.id = alert.id || defaultId;
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose);
    alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
    alertSubject.next({id});
}
