Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    items:[{
            xtype: 'container',
            itemId: 'pickerContainer'
        },
        {
            xtype: 'container',
            itemId: 'reportContainer'
        
        }
    ],
    launch: function() {
        this.down('#pickerContainer').add({
            xtype: 'rallyprojectpicker',
            fieldLabel: 'select project',
            itemId:'proj',
            margin: 10,
            listeners:{
                change: function(combobox){
                    if (this.down('#report')) {
                        Ext.ComponentQuery.query('#reportContainer')[0].remove(Ext.ComponentQuery.query('#report')[0], true);
                    }
                    this.onProjectSelected(combobox.getSelectedRecord().get('_ref'));
                },
                scope: this
            }
        });
    },
    onProjectSelected:function(projectRef){ 
        this.down('#reportContainer').add({
            xtype: 'rallystandardreport',
            project: projectRef,
            itemId: 'report',
            width: 600,
            height: 400,
            reportConfig: {
                report: Rally.ui.report.StandardReport.Reports.IterationBurndown
            }
        });
    }
});
            