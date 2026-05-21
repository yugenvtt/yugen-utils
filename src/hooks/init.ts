/**
 * @file src/hooks/init.ts
 * handles module initialization and registers the global yugen_utils api.
 **/

import { YugenUtils } from '../module/yugen-utils.js';

export const init_hook = ( ) => 
{
	/** register global api immediately at evaluation time to prevent race conditions **/
	( globalThis as any ).yugen_utils = YugenUtils;

	/** listen for initialization to log success **/
	Hooks.once( 'init', ( ) => 
	{
		console.log( 'yugen-utils | initialized shared utility library successfully' );
	} );
};
