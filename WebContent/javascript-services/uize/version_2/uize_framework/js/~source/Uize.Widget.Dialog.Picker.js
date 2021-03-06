/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Widget.Dialog.Picker
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=d" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 5
	codeCompleteness: 80
	testCompleteness: 0
	docCompleteness: 10
*/

/*?
	Introduction
		The =Uize.Widget.Dialog.Picker= widget acts as a base class for various value picker dialogs, such as date picker dialogs, color picker dialogs, etc.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Widget.Dialog.Picker= module defines the =Uize.Widget.Dialog.Picker= widget class, a subclass of =Uize.Widget.Dialog=.

		### In a Nutshell
			- intended to be subclassed to create value picker dialogs for specific types of values, such as dates, colors, etc.

			Piped Properties
				- don't need to be registered as set-get properties, although they will be ad hoc registered when they are set of the picker dialog instance

				A One Way Conduit
					- these properties only act as a conduit for values
					- they do not have the same conformer behavior as their counterparts in the value widget
					- they are not updated when their counterparts in the value widget change value
					- their values are only piped through to their counterparts in the value widget when the picker dialog instance is about to be shown
*/

Uize.module ({
	name:'Uize.Widget.Dialog.Picker',
	required:'Uize.Widget.Button.Checkbox',
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_false = false,
				_true = true
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (
					null,
					function () {
						var _this = this;

						/*** submit value ***/
							function _fireSubmissionComplete (_keepOpen) {
								_this._submittedValue = _true;
								_this.fire ({
									name:'Submission Complete',
									result:_this.children.value.valueOf (),
									keepOpen:_keepOpen
									/*?
										Instance Events
											Submission Complete
												document...
									*/
								});
							}

						/*** add the value child widget ***/
							_this.addChild ('value',_this._valueWidgetClass).wire (
								'Changed.value',
								function () {
									if (_this.get ('shown') && !_this._beforeShow) {
										_fireSubmissionComplete (_this._keepOpen);
										_this._keepOpen || _this.set ({shown:false});
									}
								}
								/*?
									Child Widget
										value
											document...
								*/
							);

						/*** add the keepOpen button ***/
							_this.addChild ('keepOpen',Uize.Widget.Button.Checkbox).wire (
								'Changed.selected',
								function (_event) {_this.set ({_keepOpen:_event.source.get ('selected')})}
								/*?
									Child Widget
										keepOpen Child Widget
											document...
								*/
							);

						/*** add event handlers ***/
							_this.wire ({
								Ok:function () {_fireSubmissionComplete ()},
								Cancel:function () {
									_this._submittedValue &&
										_this.fire ({name:'Submission Complete',result:_this._initialValue})
									;
								},
								'Before Show':function () {
									/* WORKAROUND:
										Ideally, the dialog class would have a state set-get property to indicate whether or not the dialog is actually shown, versus it just being desired to be shown because the shown set-get property is set to true.

										Another high level concept is the idea of whether or not the value of a set-get property is completely reflected, which could also apply to widgets that display images, where a url set-get property may change in order to change the image, but where the new value may not be completely reflected until the image has completed loading.

										Absent the above facilities, we do a workaround and track that we're in the beforeShow state so that the value change event handler on the value widget's value set-get property doesn't commit the value and dismiss the dialog.
									*/
									_this._beforeShow = _true;
									_this.children.value.set (_this.get (['value'].concat (_this._pipedProperties || [])));
									_this._initialValue = _this._value;
									_this._beforeShow = _this._submittedValue = _false;
								}
							});

						_this._widgetsAdded = _true;
						_this._updateUiKeepOpenState ();
					}
				),
				_classPrototype = _class.prototype
			;

		/*** Private Instance Methods ***/
			_classPrototype._updateUiKeepOpenState = function () {
				this._widgetsAdded && this.children.keepOpen.set ({selected:this._keepOpen});
			};

		/*** Register Properties ***/
			_class.registerProperties ({
				_keepOpen:{
					name:'keepOpen',
					onChange:_classPrototype._updateUiKeepOpenState,
					value:_false
					/*?
						Set-get Properties
							keepOpen
								document...

								NOTES
								- the initial value is =false=
					*/
				},
				_valueWidgetClass:'valueWidgetClass',
				_pipedProperties:'pipedProperties',
					/*?
						Set-get Properties
							pipedProperties
								document...

								NOTES
								- the initial value is =undefined=
					*/
				_value:'value'
					/*?
						Set-get Properties
							value
								document...

								NOTES
								- the initial value is =undefined=
					*/
			});

		/*** Override Initial Values for Inherited Set-Get Properties ***/
			_class.set ({
				shieldOpacity:0
			});

		return _class;
	}
});

