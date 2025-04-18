import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export function openDialog(dialog: MatDialog, component: any): void {
    const dialogRef: MatDialogRef<object> = dialog.open(component, {
        width: '50%',
        disableClose: true,
        position: { left: '25%', bottom: '20%', top: '2%' },
        height: '80%',
        panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result: object) => {
    });
}